import SolrClient from '../../libs/connections/SolrClient';
const LISTING_CORE = 'listing_v2';
const { client: listingClient } = new SolrClient(LISTING_CORE);

export default {
  searchProject: async(id) => {
    const conditionQ = `id:${id}`;
    const queryListingById = listingClient.createQuery().q(conditionQ);
    return listingClient.searchAsync(queryListingById);
  },
  searchChildListing: async(id) => {
    const conditionQ = id ? `parent_id:${id}` : '*:*';
    const queryListingById = listingClient.createQuery().q(conditionQ).start(0).rows(100);
    return listingClient.searchAsync(queryListingById);
  },
  searchProjectByOrganisation: async(id) => {
    const conditionQ = id ? `developer_company_id:${id}` : '*:*';
    const queryListingById = listingClient.createQuery().q(conditionQ).start(0).rows(100);
    return listingClient.searchAsync(queryListingById);
  }
};
