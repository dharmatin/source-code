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
  searchProjectByOrganisation: async(
    id: string,
    excludeProjectId: string,
    paging: Object
  ): Object => {
    let conditionQ = `developer_company_id:${id}`;
    if (!_.isEmpty(excludeProjectId)) {
      conditionQ += ` AND -id:${excludeProjectId}`;
    }

    const fields =
      "id, image, project_name,tagline, subtype, attachments:'', bedroom_min, " +
      "bedroom_max, bathroom_min, bathroom_max, garage_min:0, garage_max:0, completion_date:'', " +
      "architect_name:'', contractor_name:'', project_promotion:'', building_size_min, " +
      'building_size_max, land_size_min, land_size_max, district_name, city_name, province_name, ' +
      'developer_company_id, developer_name, developer_brandcolor, ads_email, ads_email2, ads_contact, ' +
      'ads_contact2, project_whatsapp, developer_city, developer_province, developer_district, ' +
      'developer_address, developer_logo, price_min, price_max, is_premium, is_gts, ' +
      'updated_date, image, status ';
    const pageStart = (paging.pageToken - 1) * paging.pageSize;
    const queryListingById = listingClient
      .createQuery()
      .q(conditionQ)
      .fl(fields)
      .start(pageStart)
      .rows(paging.pageSize);
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
  searchProjectByUserId: async(
    userId: string,
    start: number,
    row: number
  ): Object => {
    const conditionQ = `developer_user_id:${userId}`;
    const queryListingByUserId = listingClient
      .createQuery()
      .q(conditionQ)
      .start(start)
      .rows(row);
    return listingClient.searchAsync(queryListingByUserId);
  },
};
