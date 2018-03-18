// @flow
import Sequelize from 'sequelize';
import _ from 'lodash';
import MysqlClient from '../../libs/connections/MysqlClient';
import type { UserV2Referral } from './type';

const DATABASE_NAME = 'default';
const { client: clientConnection } = new MysqlClient(DATABASE_NAME);

class UserV2Dao {
  userV2: Object;
  userV2Attribute: Object;
  constructor() {
    this.userV2 = clientConnection.define('user_v2', {
      userId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'user_id'
      },
      userName: {
        type: Sequelize.STRING(64),
        field: 'user_name'
      },
      email: {
        type: Sequelize.STRING(64),
        field: 'email'
      },
      firstName: {
        type: Sequelize.STRING(64),
        field: 'first_name'
      },
      lastName: {
        type: Sequelize.STRING(64),
        field: 'last_name'
      }
    });

    this.userV2Attribute = clientConnection.define('user_attribute', {
      userId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'user_id'
      },
      profilePhoto: {
        type: Sequelize.STRING(64),
        field: 'profile_photo'
      }
    });
  }
}

export default new UserV2Dao();
