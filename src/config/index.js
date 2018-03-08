import _ from 'lodash';
import connection from './connection';
import common from './common';
import constants from './constants';
import mysql from './mysql';

const config = {
  isProduction: process.env.NODE_ENV === 'production',
  env: process.env.NODE_ENV
};

_.merge(config, connection[process.env.NODE_ENV], common[process.env.NODE_ENV], mysql[process.env.NODE_ENV], constants);

export default config;
