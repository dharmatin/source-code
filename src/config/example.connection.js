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
      username: 'STAG_DB_USERNAME',
      password: 'STAG_DB_PASSWORD',
      host: 'id-stgmaster.cjretgqtdl2a.ap-southeast-1.rds.amazonaws.com',
      port: '3306',
      database: {
        default: 'DB_DATABASE',
      },
    },
  },
  stag: {
    solr: {
      host:
        'internal-id-pro-solr-slave-2145060194.ap-southeast-1.elb.amazonaws.com',
      port: '8080',
    },
    redis: {
      host: 'id-stgredis.3bvdiw.ng.0001.apse1.cache.amazonaws.com',
      port: 6379,
    },
    mysql: {
      username: 'STAG_DB_USERNAME',
      password: 'STAG_DB_PASSWORD',
      host: 'id-stgmaster.cjretgqtdl2a.ap-southeast-1.rds.amazonaws.com',
      port: '3306',
      database: {
        default: 'DB_DATABASE',
      },
    },
  },
  prod: {
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
      username: 'PROD_DB_USERNAME',
      password: 'PROD_DB_PASSWORD',
      host: 'id-master.cjretgqtdl2a.ap-southeast-1.rds.amazonaws.com',
      port: '3306',
      database: {
        default: 'DB_DATABASE',
      },
    },
  },
  test: {
    solr: {
      host: 'solr',
      port: '8983',
    },
    redis: {
      host: 'redis',
      port: 6379,
    },
    mysql: {
      username: 'root',
      password: 'docker',
      host: 'mysql',
      port: '3306',
      database: {
        default: 'DB_DATABASE',
      },
    },
  },
};

export default common;
