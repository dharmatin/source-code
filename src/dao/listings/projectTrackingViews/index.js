// @flow
import Sequelize from 'sequelize';
import MysqlClient from '../../../libs/connections/MysqlClient';
import constants from '../../../config/constants';

const { client: projectTrackingClient } = new MysqlClient(
  constants.DATABASE_NAME
);

export default {
  saveProjectTrackingView: async(projectId: number): Object => {
    const sql =
      'UPDATE ads_project SET ads_stat = ads_stat + 1 WHERE ads_project_id = :projectId';
    return projectTrackingClient.query(sql, {
      replacements: { projectId: projectId },
      type: Sequelize.QueryTypes.RAW,
    });
  },
};
