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

  async _gettingObject(referral: Object): Promise<AgentReferral> {
    if (referral) this.agentReferral = referral.get();
    return this.agentReferral;
  }

  async requestReferral(userId: number, referralListingId: AgentReferral): Promise<AgentReferral> {
    const query = _.assign(
      {
        userId: userId,
        referralStatus: config.STATUS_REFERRAL.PENDING,
        createdDate: Sequelize.fn('NOW', 3),
      },
      referralListingId
    );
    const referral = await this.referral.create(query);
    return this._gettingObject(referral);
  }

  async checkReferral(userId: number, referralListingId: AgentReferral): Promise<AgentReferral> {
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
    return this._gettingObject(referral);
  }

  async updateRefferalById(id: number, value: AgentReferral): Promise<Array<number>> {
    const affectedRow = await this.referral.update(value, {
      where: {agentReferralId: id}
    });

    return affectedRow;
  }

  async getLatestReferralRequest(parameters: Object): Promise<AgentReferral> {
    let agentReferral: Object | AgentReferral = {};
    const referral = await this.referral.findOne({
      where: {
        userId: parameters.userId,
        adsProjectId: parameters.adsProjectId,
        referralStatus: parameters.referralStatus
      },
      order: [['createdDate', 'DESC']]
    });

    if (referral) agentReferral = referral.get();

    return agentReferral;
  }
}

export default new ReferralDao();
