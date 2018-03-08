const common = {
  local: {
    solr: {
      host: 'internal-id-stgsolr-1117783231.ap-southeast-1.elb.amazonaws.com',
      port: '8080'
    },
    redis: {
      host: 'id-stgredis.3bvdiw.ng.0001.apse1.cache.amazonaws.com',
      port: 6379
    }
  },
  staging: {
    solr: {
      host: 'internal-id-stgsolr-1117783231.ap-southeast-1.elb.amazonaws.com',
      port: '8080'
    },
    redis: {
      host: 'id-stgredis.3bvdiw.ng.0001.apse1.cache.amazonaws.com',
      port: 6379
    }
  },
  production: {
    solr: {
      host: 'internal-id-pro-solr-slave-2145060194.ap-southeast-1.elb.amazonaws.com',
      port: '8080'
    },
    redis: {
      host: 'id-redis.3bvdiw.ng.0001.apse1.cache.amazonaws.com',
      port: 6379
    }
  },
  test: {}
};

export default common;
