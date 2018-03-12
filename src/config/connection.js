const common = {
  local: {
    solr: {
      host: 'internal-id-stgsolr-1117783231.ap-southeast-1.elb.amazonaws.com',
      port: '8080',
    },
    redis: {
      host: 'id-stgredis.3bvdiw.ng.0001.apse1.cache.amazonaws.com',
      port: 6379,
    },
    mysql: {
      username: 'webmaster',
      password: 'FbY35D7h',
      host: '10.201.30.25',
      port: '3306',
      database: {
        default: 'ds_realcs',
      },
    },
  },
  staging: {
    solr: {
      host: 'internal-id-stgsolr-1117783231.ap-southeast-1.elb.amazonaws.com',
      port: '8080',
    },
    redis: {
      host: 'id-stgredis.3bvdiw.ng.0001.apse1.cache.amazonaws.com',
      port: 6379,
    },
    mysql: {
      username: 'webmaster',
      password: 'FbY35D7h',
      host: '10.201.30.25',
      port: '3306',
      database: {
        default: 'ds_realcs',
      },
    },
  },
  production: {
    solr: {
      host:
        'internal-id-pro-solr-slave-2145060194.ap-southeast-1.elb.amazonaws.com',
      port: '8080',
    },
    redis: {
      host: 'id-redis.3bvdiw.ng.0001.apse1.cache.amazonaws.com',
      port: 6379,
    },
    mysql: {
      username: 'webmaster',
      password: 'FbY35D7h',
      host: '10.201.30.25',
      port: '3306',
      database: {
        default: 'ds_realcs',
      },
    },
  },
  test: {},
};

export default common;
