import _ from 'lodash';
import connection from './connection';
import common from './common';

const config = {
  isProduction: process.env.NODE_ENV === 'production',
  env: process.env.NODE_ENV
};

_.merge(config, connection[process.env.NODE_ENV], common[process.env.NODE_ENV]);

export default config;
