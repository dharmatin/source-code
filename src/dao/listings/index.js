import SolrClient from '../../libs/connections/SolrClient';
const LISTING_CORE = 'listing_v2';
const { client: listingClient } = new SolrClient(LISTING_CORE);

export default {
  search: async(id) => {
    const conditionQ = id ? `id:${id}` : '*:*';
    const queryListingById = listingClient.createQuery().q(conditionQ).start(0).rows(10);
    await listingClient.searchAsync(queryListingById);
  }
};
