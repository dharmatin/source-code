// @flow
import SolrClient from '../../libs/connections/SolrClient';
import _ from 'lodash';
import constants from '../../config/constants';
import { resolveSolrResponse } from '../../helpers/resolver';

const { client: listingClient } = new SolrClient(
  constants.SOLR_TABLE.LISTING_CORE
);
const replaceSpaceWithAsterisk = (query: string): string =>
  _.replace(query, constants.COMMON.BLANK_SPACE, constants.COMMON.ASTERISK);
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
  'project_category'
];
const conditionForDevelopmentDeveloper =
  '-developer_company_id:0 AND status:Online AND -ads_project_id:0';

const searchByLocation = (query: string, type: string): Array => {
  const baseCondition =
    '(type:np AND status:Online AND -developer_company_id:0) AND ';
  let caseCondition, groupField, sort;

  switch (type) {
  case constants.LOCATION_LEVEL.PROVINCE:
    caseCondition = `province_name:(*${replaceSpaceWithAsterisk(query)}*)`;
    groupField = sort = 'province_name';
    break;
  case constants.LOCATION_LEVEL.CITY:
    caseCondition = `city_province:(*${replaceSpaceWithAsterisk(query)}*)`;
    groupField = sort = 'city_name';
    break;
  default:
    caseCondition = `district_city:(*${replaceSpaceWithAsterisk(query)}*)`;
    groupField = 'district_id';
    sort = 'district_name';
  };

  const createQuery = listingClient
    .createQuery()
    .q(baseCondition + caseCondition)
    .group({on: true, field: groupField, main: true})
    .sort({[sort]: constants.SORTING.ASCENDING})
    .fl(field);

  return listingClient.searchAsync(createQuery);
};

const searchByDeveloper = (query: string): Array => {
  const condition = `
    developer_name:*${replaceSpaceWithAsterisk(query)}* AND 
    ${conditionForDevelopmentDeveloper}
  `;
  const createQuery = listingClient
    .createQuery()
    .q(condition)
    .fl(field)
    .sort({
      active: constants.SORTING.DESCENDING,
    });

  return listingClient.searchAsync(createQuery);
};

const searchByDevelopment = (query: string): Array => {
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
      active: constants.SORTING.DESCENDING,
    });

  return listingClient.searchAsync(createQuery);
};

const searchBySubUnits = (query: string): Array => {
  const condition = `
    (area_exact:(*${replaceSpaceWithAsterisk(query)}*) OR
    tagline:(*${replaceSpaceWithAsterisk(query)}*)) AND 
    (developer_company_id:0 AND status:Online AND -ads_project_id:0 AND 
    project_category:(
    ${constants.SUB_UNIT_NEWLAUNCH.TOWER} 
    ${constants.SUB_UNIT_NEWLAUNCH.BLOCK} 
    ${constants.SUB_UNIT_NEWLAUNCH.CLUSTER}
    ))
  `;

  const createQuery = listingClient
    .createQuery()
    .q(condition)
    .fl(field)
    .sort({'project_category': 'ASC'});

  return listingClient.searchAsync(createQuery);
};

export default {
  searchQuery: async(query: string): Object => {
    const responseLocationProvince = await searchByLocation(
      query,
      constants.LOCATION_LEVEL.PROVINCE
    );
    const responseLocationCity = await searchByLocation(
      query,
      constants.LOCATION_LEVEL.CITY
    );
    const responseLocationDistrict = await searchByLocation(
      query,
      constants.LOCATION_LEVEL.DISTRICT
    );
    const responseDeveloper = await searchByDeveloper(query);
    const responseDevelopment = await searchByDevelopment(query);
    const responseSubUnits = await searchBySubUnits(query);

    return {
      provinces: resolveSolrResponse(responseLocationProvince),
      cities: resolveSolrResponse(responseLocationCity),
      district: resolveSolrResponse(responseLocationDistrict),
      developer: resolveSolrResponse(responseDeveloper),
      development: resolveSolrResponse(responseDevelopment),
      subunit: resolveSolrResponse(responseSubUnits)
    };
  },
};
