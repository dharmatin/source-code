import solr from 'solr-client'
import bluebird from 'bluebird'

export default class SolrClient {
  constructor(core) {
    this.client = bluebird.promisifyAll(solr.createClient({
      host: process.env.SOLR_HOST,
      port: process.env.SOLR_PORT,
      core: core,
      path: '/solr-slave'
    }))
  }
}