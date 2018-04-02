// @flow
import Sequelize from 'sequelize';
import MysqlClient from '../../../libs/connections/MysqlClient';

const DATABASE_NAME = 'default';
const { client: dailyTrackingClient } = new MysqlClient(DATABASE_NAME);

export default {
  saveDailyTrackingView: async(dailyTrackingData: Object): Object => {
    const sql =
      'INSERT INTO daily_propertyview SET d_date = :d_date, ads_project_id = :project_id, ads_id = 0, property_type = :type, property_category = :category, client_type = :client_type, access_source = 0, product_status = 0, viewed = 1, phone_lead_serp = 0, phone_lead_listdetail = 0, phone_lead_developer = 0, mail_lead_serp = 0, mail_lead_listdetail = 0, mail_lead_developer = 0, click_brochure = 0, lead_brochure = 0 ON DUPLICATE KEY UPDATE `viewed` = `viewed`+1';
    return dailyTrackingClient.query(sql, {
      replacements: dailyTrackingData,
      type: Sequelize.QueryTypes.RAW,
    });
  },
};
