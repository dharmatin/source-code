import _ from 'lodash';
import connection from './connection';
import common from './common';
import constants from './constants';

const config = {
  isProduction: process.env.NODE_ENV === 'prod',
  isTesting: process.env.NODE_ENV === 'test',
  env: process.env.NODE_ENV,
};

_.merge(
  config,
  connection[process.env.NODE_ENV],
  common[process.env.NODE_ENV],
  constants,
  { lang: 'en' },
  { translator: {} }
);

export default config;
