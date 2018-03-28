// @flow
import config from '../../config';
import Sequelize from 'sequelize';

export default class MysqlClient {
  client: Object;

  constructor(databaseName: string = 'default') {
    this.client = new Sequelize({
      database: config.mysql.database[databaseName],
      username: config.mysql.username,
      password: config.mysql.password,
      host: config.mysql.host,

      dialect: 'mysql',
      operatorsAliases: false,
      omitNull: false,
      pool: {
        max: 5,
        min: 0,
        idle: 10000,
        acquire: 30000,
      },
      define: {
        freezeTableName: true,
        timestamps: false,
      },
      dialectOptions: {
        useUTC: false, //for reading from database
      },
      timezone: '+07:00',
      logging: config.isProduction ? '' : console.log,
    });
  }
}
