// @flow
import SolrClient from '../../libs/connections/SolrClient';
import _ from 'lodash';
import constants from '../../config/constants';
import { resolveSolrResponse } from '../../helpers/resolver';

const {
  COMMON: { BLANK_SPACE, ASTERISK },
  LOCATION_LEVEL: { PROVINCE, CITY, DISTRICT },
  SORTING: { ASCENDING, DESCENDING },
  NEWLAUNCH: { SUB_UNIT: { TOWER, CLUSTER, BLOCK } },
  SOLR_TABLE: { LISTING_CORE },
} = constants;
const { client: listingClient } = new SolrClient(LISTING_CORE);
const replaceSpaceWithAsterisk = (query: string): string =>
  _.replace(query, BLANK_SPACE, ASTERISK);
const field = [
  'district_name',
  'city_name',
  'province_name',
  'province_id',
  'city_id',
  'district_id',
  'developer_name',
  'developer_company_id',
  'tagline',
  'city_province',
  'district_city',
  'id',
  'project_name',
  'tagline',
  'subproject_name',
  'parent_id',
  'project_category',
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
  const condition = `
    developer_name:*${replaceSpaceWithAsterisk(query)}* AND 
    ${conditionForDevelopmentDeveloper}
  `;
  const createQuery = listingClient
    .createQuery()
    .q(condition)
    .fl(field)
    .sort({
      active: DESCENDING,
    });

  return listingClient.searchAsync(createQuery);
};

const searchByDevelopment = (query: string): Object => {
  const condition = `
    (project_name:(*${replaceSpaceWithAsterisk(query)}*) OR 
    (project_name:*${replaceSpaceWithAsterisk(query)}* AND 
    area_exact:(*${replaceSpaceWithAsterisk(query)}*))) AND 
    ${conditionForDevelopmentDeveloper}
  `;

  const createQuery = listingClient
    .createQuery()
    .q(condition)
    .fl(field)
    .sort({
      active: DESCENDING,
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
    .sort({ project_category: ASCENDING });

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
