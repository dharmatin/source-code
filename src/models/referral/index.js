import Sequelize from 'sequelize';

export default class ReferralModel {
  constructor(connection) {
    this.model = connection.define('agent_referral', {
      referralId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'referral_id'
      },
      developerId: {
        type: Sequelize.INTEGER,
        field: 'project_id'
      },
      adsProjectId: {
        type: Sequelize.INTEGER,
        field: 'ads_id'
      },
      userId: {
        type: Sequelize.INTEGER,
        field: 'user_id'
      }
    });
  }
}
