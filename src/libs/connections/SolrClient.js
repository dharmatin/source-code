// @flow
import config from '../../config';
import solr from 'solr-client';
import bluebird from 'bluebird';

export default class SolrClient {
  client: Object;

  constructor(core: string) {
    this.client = bluebird.promisifyAll(solr.createClient({
      host: config.solr.host,
      port: config.solr.port,
      core: core,
      path: '/solr-slave'
    }));
  }
}
