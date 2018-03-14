// @flow
import _ from 'lodash';
import SolrClient from '../../libs/connections/SolrClient';
const LISTING_CORE = 'listing_v2';
const { client: listingClient } = new SolrClient(LISTING_CORE);

export default {
  searchProject: async(id: string): Object => {
    const conditionQ = `id:${id}`;
    const queryListingById = listingClient.createQuery().q(conditionQ);
    return listingClient.searchAsync(queryListingById);
  },
  searchChildListing: async(id: string): Object => {
    const conditionQ = id ? `parent_id:${id}` : '*:*';
    const queryListingById = listingClient
      .createQuery()
      .q(conditionQ)
      .start(0)
      .rows(100);
    return listingClient.searchAsync(queryListingById);
  },
  searchProjectByOrganisation: async(id: string, excludeProjectId: string): Object => {
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
  searchProjectAccessByProjectId: async(id: string): Object => {
    const conditionQ = `id:${id}`;
    const queryProjectAccess = listingClient
      .createQuery()
      .q(conditionQ)
      .matchFilter('en_project_access', '[* TO *]');
    return listingClient.searchAsync(queryProjectAccess);
  },
  searchProjectByUserId: async(userId: string): Object => {
    const conditionQ = `developer_user_id:${userId}`;
    const queryListingByUserId = listingClient.createQuery().q(conditionQ);
    return listingClient.searchAsync(queryListingByUserId);
  }
};
