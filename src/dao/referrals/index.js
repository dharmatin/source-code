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
      referralCode: {
        type: Sequelize.STRING(8),
        field: 'referral_code',
      },
      referralStatus: {
        type: Sequelize.INTEGER(3),
        field: 'referral_status',
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

  async requestReferral(userId: number, referralListingId: AgentReferral): Promise<AgentReferral | Object> {
    const query = _.assign(
      {
        userId: userId,
        referralStatus: config.STATUS_REFERRAL.PENDING,
        createdDate: Sequelize.fn('NOW', 3),
      },
      referralListingId
    );
    const referral = await this.referral.create(query);
    return (referral) ? referral.get() : {};
  }

  async checkReferral(userId: number, referralListingId: AgentReferral): Promise<AgentReferral | Object> {
    const condition = _.assign(
      {
        userId: userId,
        referralStatus: {
          [Sequelize.Op.in]: [config.STATUS_REFERRAL.PENDING, config.STATUS_REFERRAL.APPROVED],
        },
      },
      referralListingId
    );
    const query = {
      order: [['referralStatus', 'DESC']],
      where: condition,
    };
    const referral = await this.referral.findOne(query);
    return (referral) ? referral.get() : {};
  }

  async updateRefferalById(id: number, value: AgentReferral): Promise<Array<number>> {
    const affectedRow = await this.referral.update(value, {
      where: {agentReferralId: id}
    });

    return affectedRow;
  }

  async getLatestReferralRequest(parameters: Object): Promise<AgentReferral | Object> {
    const referral = await this.referral.findOne({
      where: {
        userId: parameters.userId,
        adsProjectId: parameters.adsProjectId,
        referralStatus: parameters.referralStatus
      },
      order: [['createdDate', 'DESC']]
    });
    return (referral) ? referral.get() : {};
  }

  async getReferralByProjectId(projectId: Array): Object {
    const condition = _.assign(
      {
        referralStatus: config.STATUS_REFERRAL.APPROVED,
        adsProjectId: {
          [Sequelize.Op.in]: projectId,
        },
      },
    );
    const query = {
      // order: [['referralStatus', 'DESC']],
      where: condition,
    };
    console.log('getReferral');
    let referral = await this.referral.findAll(query);
    return (referral.length > 0) ?
      _map(referral, (item) => {
        return item.get();
      }) : {};
  }
}

export default new ReferralDao();
