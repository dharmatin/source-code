// @flow
import Sequelize from 'sequelize';
import _ from 'lodash';
import MysqlClient from '../../libs/connections/MysqlClient';
import type { AgentReferral } from './type';
import userV2Dao from '../userV2';
import projectDao from '../listings/models/adsProject';
import config from '../../config';

const DATABASE_NAME = 'default';
const { client: ReferralClient } = new MysqlClient(DATABASE_NAME);

class ReferralDao {
  referral: Object;
  referralAgent: Object;
  userV2: Object;
  userV2Attribute: Object;
  project: Object;

  constructor() {
    this.userV2 = userV2Dao.userV2;
    this.userV2Attribute = userV2Dao.userV2Attribute;
    this.project = projectDao.adsProject;

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
      }
    });
  }

  async requestReferral(
    userId: number,
    referralListingId: AgentReferral
  ): Promise<AgentReferral | Object> {
    const query = _.assign(
      {
        userId: userId,
        referralStatus: config.STATUS_REFERRAL.PENDING,
        createdDate: Sequelize.fn('NOW', 3),
      },
      referralListingId
    );
    const referral = await this.referral.create(query);
    return referral ? referral.get() : {};
  }

  async checkReferral(
    userId: number,
    referralListingId: AgentReferral
  ): Promise<AgentReferral | Object> {
    const condition = _.assign(
      {
        userId: userId,
        referralStatus: {
          [Sequelize.Op.in]: [
            config.STATUS_REFERRAL.PENDING,
            config.STATUS_REFERRAL.APPROVED,
          ],
        },
      },
      referralListingId
    );
    const query = {
      order: [['referralStatus', 'DESC']],
      where: condition,
    };
    const referral = await this.referral.findOne(query);
    return referral ? referral.get() : {};
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
    const referral = await this.referral.findOne({
      where: {
        userId: parameters.userId,
        adsProjectId: parameters.adsProjectId,
        referralStatus: parameters.referralStatus,
      },
      order: [['createdDate', 'DESC']],
    });
    return referral ? referral.get() : {};
  }

  async getReferralByCodeAndListingId(dataReferral: Object): Promise<string> {
    const conditionQ = {
      referral_status: config.STATUS_REFERRAL.APPROVED,
      ...dataReferral
    };

    const referral = await this.referral.findOne({
      where: conditionQ,
      raw: true
    });

    return referral;
  }

  async getReferralByProjectId(projectId: Array<number>, start: any, row: any): any {
    this.referral.hasOne(this.userV2);
    this.referral.hasOne(this.userV2Attribute);
    this.referral.hasOne(this.project);

    const rawReferralList = await ReferralClient.query(`SELECT ` +
      `AR.*, U.user_name, U.email, U.first_name, U.last_name, UA.profile_photo, AP.ads_name ` +
      `FROM agent_referral AR ` +
      `INNER JOIN user_v2 U ON AR.user_id = U.user_id ` +
      `INNER JOIN user_attribute UA ON AR.user_id = UA.user_id ` +
      `INNER JOIN ads_project AP ON AR.ads_project_id = AP.ads_project_id ` +
      `WHERE AR.ads_project_id IN (${projectId.join()}) ` +
      `AND AR.referral_status IN (${config.STATUS_REFERRAL.PENDING}, ${config.STATUS_REFERRAL.APPROVED}) ` +
      `LIMIT ${start} , ${row}`
      , { type: Sequelize.QueryTypes.SELECT});

    return rawReferralList;
  }
}

export default new ReferralDao();
