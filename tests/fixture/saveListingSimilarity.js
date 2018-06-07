import solr from 'solr-client';
import bluebird from 'bluebird';
import listing from './similarListingData.json';

const HOST = '127.0.0.1';
const PORT = '8983';
const addListing = async() => {
  const solrClient = bluebird.promisifyAll(solr.createClient({
    host: HOST,
    port: PORT,
    path: '/solr-slave',
    core: 'listing',
    solrVersion: '4.0'
  }));
  let listings;
  try {
    listings = await solrClient.searchAsync(solrClient.createQuery().q('id:hosABI* OR id:hosDENI* OR id:hosORY* OR id:hosNILA* OR id:*Test*'));
    if (listings.response.numFound) {
      await solrClient.deleteByQueryAsync('id:hosABI* OR id:hosDENI* OR id:hosORY* OR id:hosNILA* OR id:*Test*');
    }
    await solrClient.addAsync(listing);
    await solrClient.commitAsync();
  } catch (e) {
    throw new Error(e);
  }
};

export default addListing;
