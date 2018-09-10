// @flow
import SolrClient from '../../libs/connections/SolrClient';
import constants from '../../config/constants';
import { resolveSolrResponse } from '../../helpers/resolver';
import { replaceSpaceWithAsterisk } from '../../helpers/stringHelper';
import _ from 'lodash';

const {
  LOCATION_LEVEL: { PROVINCE, CITY, DISTRICT },
  SORTING: { ASCENDING, DESCENDING },
  NEWLAUNCH: {
    SUB_UNIT: { TOWER, CLUSTER, BLOCK },
  },
  SOLR_TABLE: { LISTING_CORE },
} = constants;
const { client: listingClient } = new SolrClient(LISTING_CORE);
const field = [
  'district_name',
  'city_name',
  'province_name',
  'province_id',
  'city_id',
  'district_id',
  'developer_name',
  'tagline',
  'city_province',
  'district_city',
  'id',
  'project_name',
  'tagline',
  'subproject_name',
  'parent_id',
  'project_category',
  'developer_company_id',
];
const conditionForDevelopmentDeveloper =
  '-developer_company_id:0 AND status:Online AND -ads_project_id:0';

const searchByLocation = (query: string, type: string): Object => {
  const baseCondition =
    '(type:np AND status:Online AND -developer_company_id:0) AND ';
  let caseCondition, groupField, sort;

  switch (type) {
  case PROVINCE:
    caseCondition = `province_name:(*${replaceSpaceWithAsterisk(query)}*)`;
    groupField = sort = 'province_name';
    break;
  case CITY:
    caseCondition = `city_province:(*${replaceSpaceWithAsterisk(query)}*)`;
    groupField = sort = 'city_name';
    break;
  default:
    caseCondition = `district_city:(*${replaceSpaceWithAsterisk(query)}*)`;
    groupField = 'district_id';
    sort = 'district_name';
  }

  const createQuery = listingClient
    .createQuery()
    .q(baseCondition + caseCondition)
    .group({ on: true, field: groupField, main: true })
    .sort({ [sort]: ASCENDING })
    .fl(field);

  return listingClient.searchAsync(createQuery);
};

const searchByDeveloper = (query: string): Object => {
  if (_.isEmpty(query)) {
    return {};
  }

  const condition = `
    developer_name:(*${query}*) AND 
    ${conditionForDevelopmentDeveloper}
  `;
  const createQuery = listingClient
    .createQuery()
    .q(condition)
    .fl(field)
    .sort({
      score: DESCENDING,
    });

  return listingClient.searchAsync(createQuery);
};

const searchByDevelopment = (query: string): Object => {
  if (_.isEmpty(query)) {
    return {};
  }

  const condition = `
    project_name:(*${query}*) AND 
    ${conditionForDevelopmentDeveloper}
  `;

  const createQuery = listingClient
    .createQuery()
    .q(condition)
    .fl(field)
    .sort({
      score: DESCENDING,
    });

  return listingClient.searchAsync(createQuery);
};

const searchBySubUnits = (query: string): Object => {
  const condition = `
    (area_exact:(*${replaceSpaceWithAsterisk(query)}*) OR
    tagline:(*${replaceSpaceWithAsterisk(query)}*)) AND 
    (developer_company_id:0 AND status:Online AND -ads_project_id:0 AND 
    project_category:(
    ${TOWER} 
    ${BLOCK} 
    ${CLUSTER}
    ))
  `;

  const createQuery = listingClient
    .createQuery()
    .q(condition)
    .fl(field)
    .sort({ score: DESCENDING });

  return listingClient.searchAsync(createQuery);
};

export default {
  searchQuery: async(query: string): Object => {
    const responseLocationProvince = await searchByLocation(query, PROVINCE);
    const responseLocationCity = await searchByLocation(query, CITY);
    const responseLocationDistrict = await searchByLocation(query, DISTRICT);
    const responseDeveloper = await searchByDeveloper(query);
    const responseDevelopment = await searchByDevelopment(query);
    const responseSubUnits = await searchBySubUnits(query);

    return {
      provinces: resolveSolrResponse(responseLocationProvince),
      cities: resolveSolrResponse(responseLocationCity),
      district: resolveSolrResponse(responseLocationDistrict),
      developer: resolveSolrResponse(responseDeveloper),
      development: resolveSolrResponse(responseDevelopment),
      subunit: resolveSolrResponse(responseSubUnits),
    };
  },
};
