// @flow
import Sequelize from 'sequelize';
import _ from 'lodash';
import MysqlClient from '../../../libs/connections/MysqlClient';

const DATABASE_NAME = 'default';
const { client: clientConnection } = new MysqlClient(DATABASE_NAME);

class AdsProjectDao {
  adsProject: Object;
  constructor() {
    this.adsProject = clientConnection.define('ads_project', {
      adsProjectId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'ads_project_id'
      },
      adsName: {
        type: Sequelize.STRING(256),
        field: 'ads_name'
      },
      adsTagline: {
        type: Sequelize.STRING(256),
        field: 'ads_tagline'
      }
    });
  }
}

export default new AdsProjectDao();
