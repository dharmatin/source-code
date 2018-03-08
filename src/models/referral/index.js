import Sequelize from 'sequelize';

export default class ReferralModel {
  constructor(connection) {
    this.model = connection.define('agent_referral', {
      agentReferralId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'agent_referral_id'
      },
      userId: {
        type: Sequelize.INTEGER,
        field: 'user_id'
      },
      adsProjectId: {
        type: Sequelize.INTEGER,
        field: 'ads_project_id'
      },
      adsId: {
        type: Sequelize.INTEGER,
        field: 'ads_id'
      },
      propertyType: {
        type: Sequelize.STRING(2),
        field: 'property_type'
      },
      propertyCategory: {
        type: Sequelize.STRING(2),
        field: 'property_category'
      },
      referralCode: {
        type: Sequelize.STRING(8),
        field: 'referral_code'
      },
      referralStatus: {
        type: Sequelize.INTEGER(3),
        field: 'referral_status'
      },
      createdDate: {
        type: Sequelize.DATE,
        field: 'created_date'
      },
      approvedDate: {
        type: Sequelize.DATE,
        field: 'approved_date'
      },
      rejectedDate: {
        type: Sequelize.DATE,
        field: 'rejected_date'
      },
      removedDate: {
        type: Sequelize.DATE,
        field: 'removed_date'
      }
    });
  }
}
