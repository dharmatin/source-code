// @flow
import SolrClient from '../../libs/connections/SolrClient';
import constant from '../../config/constants';
import { resolveSolrResponse } from '../../helpers/resolver';
import { replaceSpaceWithAsterisk } from '../../helpers/stringHelper';
import _ from 'lodash';
import type { RequestQueryParameters } from './type';

const { client: listingClient } = new SolrClient(
  constant.SOLR_TABLE.LISTING_CORE
);

const baseSolrQuery = '(type:np AND status:Online AND -developer_company_id:0)';

const buildQueryByDeveloper = (placeIds: Array<string>): string => {
  const numberIds = _.filter(
    placeIds,
    (item: any): boolean => parseInt(item) === _.toNumber(item)
  );
  return _.size(numberIds) > 0 ?
    `developer_company_id:(${_.join(placeIds, constant.COMMON.BLANK_SPACE)})` :
    '';
};

const buildQueryByDevelopmentAndUnit = (placeIds: Array<string>): string =>
  `id:(${_.join(placeIds, constant.COMMON.BLANK_SPACE)})`;

const buildQueryByLocationIds = (placeIds: Array<string>): string => {
  const provinceQuery = `province_id:(${_.join(
    placeIds,
    constant.COMMON.BLANK_SPACE
  )})`;
  const cityQuery = `city_id:(${_.join(
    placeIds,
    constant.COMMON.BLANK_SPACE
  )})`;
  const districtQuery = `district_id:(${_.join(
    placeIds,
    constant.COMMON.BLANK_SPACE
  )})`;
  return `(${[provinceQuery, cityQuery, districtQuery].join(
    constant.COMMON.TEXT_OR_WITH_SPACE
  )})`;
};

const buildQueryByPlaceIds = (placeIds: Array<string>): string => {
  const queryLocation = buildQueryByLocationIds(placeIds);
  const queryDeveloper = buildQueryByDeveloper(placeIds);
  const queryDevelopmentAndUnit = buildQueryByDevelopmentAndUnit(placeIds);
  const rawQuery = !_.isEmpty(queryDeveloper) ?
    [
      `(${queryLocation})`,
      `(${queryDeveloper})`,
      `(${queryDevelopmentAndUnit})`,
    ] :
    [`(${queryLocation})`, `(${queryDevelopmentAndUnit})`];
  const queryPlaceIds = rawQuery.join(constant.COMMON.TEXT_OR_WITH_SPACE);
  return [baseSolrQuery, `(${queryPlaceIds})`].join(
    constant.COMMON.TEXT_AND_WITH_SPACE
  );
};

const buildQueryByCustomTexts = (customTexts: Array<string>): string => {
  const innerQuery = _.map(
    customTexts,
    (text: string): any => `*${replaceSpaceWithAsterisk(text)}*`
  ).join(constant.COMMON.TEXT_OR_WITH_SPACE);
  return `(project_name:(${innerQuery})${
    constant.COMMON.TEXT_OR_WITH_SPACE
  }description:(${innerQuery}))`;
};

const buildQueryByPlace = (places: Array<Object>): string => {
  const queryLevel1 = _.compact(
    _.map(
      _.filter(places, (place: Object): any => !_.isEmpty(place.level1)),
      (place: Object): any => `"${place.level1}"`
    )
  ).join(constant.COMMON.TEXT_OR_WITH_SPACE);
  const queryLevel2 = _.compact(
    _.map(
      _.filter(places, (place: Object): any => !_.isEmpty(place.level2)),
      (place: Object): any => `"${place.level2}"`
    )
  ).join(constant.COMMON.TEXT_OR_WITH_SPACE);
  const queryLevel3 = _.compact(
    _.map(
      _.filter(places, (place: Object): any => !_.isEmpty(place.level3)),
      (place: Object): any => `"${place.level3}"`
    )
  ).join(constant.COMMON.TEXT_OR_WITH_SPACE);
  const placeQuery = [
    `province_name:(${!_.isEmpty(queryLevel1) ? queryLevel1 : '*'})`,
    `city_name:(${!_.isEmpty(queryLevel2) ? queryLevel2 : '*'})`,
    `district_name:(${!_.isEmpty(queryLevel3) ? queryLevel3 : '*'})`,
  ];

  return `(${placeQuery.join(constant.COMMON.TEXT_AND_WITH_SPACE)})`;
};

export const makeQuery = (body: Object): string => {
  const { placeIds, customTexts, places } = body;
  const isQueryByPlaceIds = _.size(placeIds) > 0;
  const isQueryByCustomTexts = _.size(customTexts) > 0;
  const isQueryByPlace = _.size(places) > 0;

  const concatQuery = [];

  if (isQueryByPlaceIds) return buildQueryByPlaceIds(placeIds);
  concatQuery.push(baseSolrQuery);
  if (isQueryByCustomTexts) {
    concatQuery.push(buildQueryByCustomTexts(customTexts));
  }
  if (isQueryByPlace) concatQuery.push(buildQueryByPlace(places));

  return concatQuery.join(constant.COMMON.TEXT_AND_WITH_SPACE);
};

export const searchByProject = (
  queryParameters: RequestQueryParameters
): Promise<Object> => {
  const { body } = queryParameters;
  const { pageSize, nextPageToken } = queryParameters.query;
  const createQuery = listingClient
    .createQuery()
    .start((nextPageToken - 1) * pageSize)
    .rows(pageSize)
    .q(makeQuery(body))
    .sort({
      product_status: constant.SORTING.DESCENDING,
      is_premium: constant.SORTING.DESCENDING,
      score: constant.SORTING.DESCENDING,
    });
  return listingClient.searchAsync(createQuery);
};

export default {
  defaultSearchAndSort: async(
    queryParameters: RequestQueryParameters
  ): Promise<Array<Object>> => {
    const listings = await searchByProject(queryParameters);
    return [...resolveSolrResponse(listings)];
  },
  searchAndSort: async(
    sortBy: string,
    direction: string,
    queryParameters: RequestQueryParameters
  ): Promise<Array<Object>> => {
    return [];
  },
};
