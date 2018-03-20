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
    const query = _.assign(agent,
      {
        referralStatus: config.STATUS_REFERRAL.PENDING,
        createdDate: Sequelize.fn('NOW', 3)
      }
    );
    const referral = await this.referral.create(query);
    if (referral) {
      ReferralClient.query(`UPDATE user_v2 SET news_subscribe_status=${iSubscribed}, property_subscribe_status=${iSubscribed} WHERE user_id=` + referral.get().userId);
    }
    return referral ? referral.get() : {};
  }

  async checkReferral(
    agent: AgentReferral
  ): Promise<AgentReferral | Object> {
    const condition = _.assign(
      {
        userId: agent.userId,
        referralStatus: {
          [Sequelize.Op.in]: [
            config.STATUS_REFERRAL.PENDING,
            config.STATUS_REFERRAL.APPROVED,
          ],
        },
        adsProjectId: agent.adsProjectId,
        propertyType: agent.propertyType
      }
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
    const conditionQ = {
      userId: parameters.userId,
      adsProjectId: parameters.adsProjectId
    }

    if (!_.isNil(parameters.referralStatus))
      _.assign(conditionQ, {referralStatus: parameters.referralStatus});

    const referral = await this.referral.findOne({
      where: conditionQ,
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
}

export default new ReferralDao();
