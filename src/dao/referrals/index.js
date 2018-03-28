// @flow
import Sequelize from 'sequelize';
import _ from 'lodash';
import MysqlClient from '../../libs/connections/MysqlClient';
import type { AgentReferral } from './type';
import config from '../../config';

const DATABASE_NAME = 'default';
const { client: ReferralClient } = new MysqlClient(DATABASE_NAME);

class ReferralDao {
  referral: Object;

  constructor() {
    this.referral = ReferralClient.define('agent_referral', {
      agentReferralId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'agent_referral_id',
      },
      userId: {
        type: Sequelize.INTEGER,
        field: 'user_id',
      },
      adsProjectId: {
        type: Sequelize.INTEGER,
        field: 'ads_project_id',
      },
      adsId: {
        type: Sequelize.INTEGER,
        field: 'ads_id',
      },
      propertyType: {
        type: Sequelize.STRING(2),
        field: 'property_type',
      },
      referralReason: {
        type: Sequelize.TEXT,
        field: 'referral_reason',
      },
      propertyCategory: {
        type: Sequelize.STRING(2),
        field: 'property_category',
      },
      messageRequest: {
        type: Sequelize.STRING(8),
        field: 'message_request',
      },
      referralCode: {
        type: Sequelize.STRING(8),
        field: 'referral_code',
      },
      referralStatus: {
        type: Sequelize.INTEGER(3),
        field: 'referral_status',
      },
      referralReason: {
        type: Sequelize.STRING(50),
        allowNull: true,
        defaultValue: null,
        field: 'referral_reason',
      },
      createdDate: {
        type: Sequelize.DATE,
        field: 'created_date',
      },
      approvedDate: {
        type: Sequelize.DATE,
        field: 'approved_date',
      },
      rejectedDate: {
        type: Sequelize.DATE,
        field: 'rejected_date',
      },
      removedDate: {
        type: Sequelize.DATE,
        field: 'removed_date',
      },
    });
  }

  async requestReferral(
    agent: AgentReferral,
    iSubscribed: number
  ): Promise<AgentReferral | Object> {
    const query = _.assign(agent, {
      referralStatus: config.STATUS_REFERRAL.PENDING,
      createdDate: Sequelize.fn('NOW', 3),
    });
    const referral = await this.referral.create(query);
    if (referral) {
      ReferralClient.query(
        `UPDATE user_v2 SET news_subscribe_status=${iSubscribed}, property_subscribe_status=${iSubscribed} WHERE user_id=` +
          referral.get().userId
      );
    }
    return referral ? referral.get() : {};
  }

  async checkReferral(agent: AgentReferral): Promise<AgentReferral | Object> {
    const condition = _.assign({
      userId: agent.userId,
      referralStatus: {
        [Sequelize.Op.in]: [
          config.STATUS_REFERRAL.PENDING,
          config.STATUS_REFERRAL.APPROVED,
        ],
      },
      adsProjectId: agent.adsProjectId,
      propertyType: agent.propertyType,
    });
    const query = {
      order: [['referralStatus', 'DESC']],
      where: condition,
    };
    const referral = await this.referral.findOne(query);
    return referral ? referral.get() : {};
  }

  async getOtherReferralPending(adsProjectId: Array<number>): Promise<number> {
    const condition = {
      adsProjectId: {
        [Sequelize.Op.in]: adsProjectId,
      },
      referralStatus: config.STATUS_REFERRAL.PENDING,
    };
    const query = {
      where: condition,
    };
    const referral = await this.referral.findAndCountAll(query);
    return referral ? referral.count : 0;
  }

  async updateRefferalById(
    id: number,
    value: AgentReferral
  ): Promise<Array<number>> {
    const affectedRow = await this.referral.update(value, {
      where: { agentReferralId: id },
    });

    return affectedRow;
  }

  async getLatestReferralRequest(
    parameters: Object
  ): Promise<AgentReferral | Object> {
    const conditionQ = {
      userId: parameters.userId,
      adsProjectId: parameters.adsProjectId,
    };

    if (!_.isNil(parameters.referralStatus)) {
      _.assign(conditionQ, { referralStatus: parameters.referralStatus });
    }

    const referral = await this.referral.findOne({
      where: conditionQ,
      order: [['createdDate', 'DESC']],
    });
    return referral ? referral.get() : {};
  }

  async getReferralByCodeAndListingId(dataReferral: Object): Promise<string> {
    const conditionQ = {
      referral_status: config.STATUS_REFERRAL.APPROVED,
      ...dataReferral,
    };

    const referral = await this.referral.findOne({
      where: conditionQ,
      raw: true,
    });

    return referral;
  }

  async getReferralByProjectId(companyId: string, start: any, row: any): any {
    const limitQuery = `LIMIT ${start} , ${row}`;
    const rawReferralList = await ReferralClient.query(
      `SELECT ` +
        `AR.user_id, AR.ads_project_id, AR.message_request, AR.referral_status, ` +
        ` AR.created_date, AR.approved_date, AR.removed_date, ` +
        `U.user_name, U.email, U.first_name, U.last_name, UNIX_TIMESTAMP(UG.first_activated_date) first_activated_date, ` +
        `UA.personalweb_url, UA.profile_photo, UA.contact_no, AP.ads_name, C.company_name  ` +
        `FROM agent_referral AR ` +
        `INNER JOIN user_v2 U ON AR.user_id = U.user_id ` +
        `INNER JOIN user_group UG ON UG.user_id = U.user_id AND UG.user_id = AR.user_id ` +
        ` AND UG.functional_group_id = 2 AND UG.status = 'A' AND UG.expired_date > NOW() AND UG.ended_date > NOW() ` +
        `INNER JOIN user_attribute UA ON AR.user_id = UA.user_id ` +
        `INNER JOIN ads_project AP ON AR.ads_project_id = AP.ads_project_id ` +
        `INNER JOIN developer_company_v2 D ON D.developer_company_id= AP.developer_company_id ` +
        `INNER JOIN company_v2 C ON U.company_id=C.company_id ` +
        `WHERE D.developer_company_id = :companyId ` +
        `AND AR.referral_status IN (:referralStatus) ${limitQuery}`,
      {
        replacements: {
          companyId: companyId,
          referralStatus: [
            config.STATUS_REFERRAL.PENDING,
            config.STATUS_REFERRAL.APPROVED,
          ],
        },
        type: Sequelize.QueryTypes.SELECT,
      }
    );
    return rawReferralList;
  }

  async getCountReferralByProjectId(companyId: string): any {
    const rawCountReferralList = await ReferralClient.query(
      `SELECT ` +
        `COUNT(AR.user_id) AS total ` +
        `FROM agent_referral AR ` +
        `INNER JOIN user_v2 U ON AR.user_id = U.user_id ` +
        `INNER JOIN user_group UG ON UG.user_id = U.user_id AND UG.user_id = AR.user_id ` +
        ` AND UG.functional_group_id = 2 AND UG.status = 'A' AND UG.expired_date > NOW() AND UG.ended_date > NOW() ` +
        `INNER JOIN user_attribute UA ON AR.user_id = UA.user_id ` +
        `INNER JOIN ads_project AP ON AR.ads_project_id = AP.ads_project_id ` +
        `INNER JOIN developer_company_v2 D ON D.developer_company_id= AP.developer_company_id ` +
        `INNER JOIN company_v2 C ON U.company_id=C.company_id ` +
        `WHERE D.developer_company_id = :companyId ` +
        `AND AR.referral_status IN (:referralStatus) `,
      {
        replacements: {
          companyId: companyId,
          referralStatus: [
            config.STATUS_REFERRAL.PENDING,
            config.STATUS_REFERRAL.APPROVED,
          ],
        },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    return rawCountReferralList;
  }
}

export default new ReferralDao();
