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
      password: 'Pr0W3br321REA',
      host: 'id-stgmaster.cjretgqtdl2a.ap-southeast-1.rds.amazonaws.com',
      port: '3306',
      database: {
        default: 'ds_real',
      },
    },
  },
  stag: {
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
      password: 'Pr0W3br321REA',
      host: 'id-stgmaster.cjretgqtdl2a.ap-southeast-1.rds.amazonaws.com',
      port: '3306',
      database: {
        default: 'ds_real',
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
      username: 'neptunus',
      password: 'Pr0R123NepTu1D3c94',
      host: 'id-master.cjretgqtdl2a.ap-southeast-1.rds.amazonaws.com',
      port: '3306',
      database: {
        default: 'ds_real',
      },
    },
  },
  test: {},
};

export default common;
