// @flow
import Sequelize from 'sequelize';
const DATABASE_NAME = 'default';
import MysqlClient from '../../../libs/connections/MysqlClient';
const { client: projectTrackingClient } = new MysqlClient(DATABASE_NAME);

export default {
	saveProjectTrackingView: async(project_id: number): Object => {
    const sql = 'UPDATE ads_project SET ads_stat = ads_stat + 1 WHERE ads_project_id = :project_id';
    return projectTrackingClient.query(sql, {replacements: {project_id: project_id}, type: Sequelize.QueryTypes.RAW});
  }
}