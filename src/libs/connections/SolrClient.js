import config from '../../config/index';
import solr from 'solr-client';
import bluebird from 'bluebird';

export default class SolrClient {
  constructor(core) {
    this.client = bluebird.promisifyAll(solr.createClient({
      host: config.solr.host,
      port: config.solr.port,
      core: core,
      path: '/solr-slave'
    }));
  }
}
