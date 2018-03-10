// @flow
import _ from 'lodash';
import SolrClient from '../../libs/connections/SolrClient';
const LISTING_CORE = 'listing_v2';
const { client: listingClient } = new SolrClient(LISTING_CORE);

export default {
  searchProject: async (id: string) => {
    const conditionQ = `id:${id}`;
    const queryListingById = listingClient.createQuery().q(conditionQ);
    return listingClient.searchAsync(queryListingById);
  },
  searchChildListing: async (id: string) => {
    const conditionQ = id ? `parent_id:${id}` : '*:*';
    const queryListingById = listingClient
      .createQuery()
      .q(conditionQ)
      .start(0)
      .rows(100);
    return listingClient.searchAsync(queryListingById);
  },
  searchProjectByOrganisation: async (id: string, excludeProjectId: string) => {
    let conditionQ = `developer_company_id:${id}`;
    if (!_.isEmpty(excludeProjectId)) {
      conditionQ += ` AND -id:${excludeProjectId}`;
    }

    const queryListingById = listingClient
      .createQuery()
      .q(conditionQ)
      .start(0)
      .rows(100);
    return listingClient.searchAsync(queryListingById);
  },
};
