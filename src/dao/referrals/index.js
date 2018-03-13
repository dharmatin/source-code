// @flow
import Sequelize from 'sequelize';
import _ from 'lodash';
import MysqlClient from '../../libs/connections/MysqlClient';
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

  async insertReferral(values: Object): Object {
    const referral = await this.referral;
    return referral.create(values);
  }

  async requestReferral(userId: number, listingId: string): Object {
    const values = _.assign(
      {
        userId: userId,
        referralStatus: -1,
        createdDate: Sequelize.fn('NOW', 3)
      },
      this._formatingListing(listingId)
    );
    const referral = await this.referral.create(values);
    return referral.get();
  }

  async getRefferral(condition: Object): Object {
    const referral = await this.referral.findOne({
      where: condition,
    });
    return referral.get();
  }

  _formatingListing(listingId: string): Object {
    return {
      adsProjectId: listingId.substring(3),
      propertyType: listingId.substring(0, 2),
      propertyCategory: listingId.substring(2, 3)
    };
  }

  async checkReferral(userId: number, listingId: string): Object {
    const condition = _.assign(
      {
        userId: userId,
        referralStatus: {
          [Sequelize.Op.in]: [-1, 1],
        }
      },
      this._formatingListing(listingId)
    );
    const query = {
      order: [
        ['referralStatus', 'DESC']
      ],
      where: condition
    };
    const result = await this.referral.findOne(query);
    if (!_.isNull(result)) {
      return result.get();
    }
    return result;
  }
}

export default new ReferralDao();
