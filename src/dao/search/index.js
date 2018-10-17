// @flow
import SolrClient from '../../libs/connections/SolrClient';
import constant from '../../config/constants';
import {
  resolveSolrResponse,
  resolveSolrGroupResponse,
} from '../../helpers/resolver';
import { replaceSpaceWithAsterisk } from '../../helpers/stringHelper';
import _ from 'lodash';
import type { RequestQueryParameters } from './type';

const { client: listingClient } = new SolrClient(
  constant.SOLR_TABLE.LISTING_CORE
);

const baseSolrQuery = '(type:np AND status:Online AND -developer_company_id:0)';
const defaultChildListingQuery =
  '(type: np AND developer_company_id:0 AND -ads_project_id:0 AND status:Online)';
const FIELD_MAP = {
  price: 'price_sort',
  landSize: 'land_size',
  builtUp: 'building_size',
  published: 'active',
  posted: 'created_date',
  bedroom: 'bedroom',
  bathroom: 'bathroom',
};

let ngroups = 0;

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
    `province_name:(${
      !_.isEmpty(queryLevel1) ? queryLevel1.replace('-', ' ') : '*'
    })`,
    `city_name:(${
      !_.isEmpty(queryLevel2) ? queryLevel2.replace('-', ' ') : '*'
    })`,
    `district_name:(${
      !_.isEmpty(queryLevel3) ? queryLevel3.replace('-', ' ') : '*'
    })`,
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

export const buildSortQuery = async(
  queryParameters: RequestQueryParameters,
  sortBy: string,
  direction: string
): Promise<string> => {
  const { body } = queryParameters;
  const sortedAdsProjectIds = await findSortedAdsProjectId(
    queryParameters,
    sortBy,
    direction
  );

  ngroups = sortedAdsProjectIds.numFound;

  const boostQueryAdsProjectId = buildMultipleAdsProjectIdBoostQuery(
    sortedAdsProjectIds.items
  );
  if (!_.isEmpty(boostQueryAdsProjectId)) {
    return [makeQuery(body), boostQueryAdsProjectId].join(
      constant.COMMON.TEXT_AND_WITH_SPACE
    );
  }

  return '';
};

const buildChildListingQuery = (
  queryParameters: RequestQueryParameters
): string => {
  const { body } = queryParameters;
  const baseQuery = _.replace(makeQuery(body), baseSolrQuery, '');
  return `(${defaultChildListingQuery})${baseQuery}`;
};

export const findSortedAdsProjectId = async(
  queryParameters: RequestQueryParameters,
  sortBy: string,
  direction: string
): Promise<Object> => {
  const query = buildChildListingQuery(queryParameters);
  const filterQuery = !_.isEmpty(buildFilterQuery(queryParameters)) ?
    constant.COMMON.TEXT_AND_WITH_SPACE + buildFilterQuery(queryParameters) :
    '';
  const { pageSize, nextPageToken } = queryParameters.query;
  const createQuery = listingClient
    .createQuery()
    .q(query + filterQuery)
    .fl('ads_project_id')
    .start((nextPageToken - 1) * pageSize)
    .rows(pageSize)
    .group({
      field: 'ads_project_id',
      ngroups: true,
    })
    .sort(
      !_.isUndefined(FIELD_MAP[sortBy]) ?
        { [FIELD_MAP[sortBy]]: direction } :
        {
          product_status: constant.SORTING.DESCENDING,
          is_premium: constant.SORTING.DESCENDING,
          score: constant.SORTING.DESCENDING,
        }
    );
  const result = await listingClient.searchAsync(createQuery);
  return resolveSolrGroupResponse(result, 'ads_project_id');
};

const buildMultipleAdsProjectIdBoostQuery = (
  adsProjectIds: Array<string>
): string => {
  let exponent = _.size(adsProjectIds);
  const boostAdsProjectId = _.map(adsProjectIds, (id: any): any => {
    exponent--;
    return `${id}^${Math.pow(5, exponent)}`;
  });

  return _.size(adsProjectIds) > 0 ?
    `ads_project_id:(${_.join(boostAdsProjectId, ' ')})` :
    '';
};

export const searchByProject = async(
  queryParameters: RequestQueryParameters,
  sortBy: string,
  direction: string
): Promise<Object> => {
  if (!_.isEmpty(buildFilterQuery(queryParameters))) {
    return searchAndSortProject(queryParameters, sortBy, direction);
  }
  const { body } = queryParameters;
  const { pageSize, nextPageToken } = queryParameters.query;
  const sortField = FIELD_MAP[sortBy];
  const sort = !_.isUndefined(FIELD_MAP[sortBy]) ?
    {
      [sortField]: direction,
    } :
    {
      product_status: constant.SORTING.DESCENDING,
      is_premium: constant.SORTING.DESCENDING,
      score: constant.SORTING.DESCENDING,
    };
  const createQuery = listingClient
    .createQuery()
    .start((nextPageToken - 1) * pageSize)
    .rows(pageSize)
    .q(makeQuery(body))
    .sort(sort);
  return listingClient.searchAsync(createQuery);
};

export const searchAndSortProject = async(
  queryParameters: RequestQueryParameters,
  sortBy: string,
  direction: string
): Promise<Object> => {
  const { pageSize } = queryParameters.query;
  const sortQuery = await buildSortQuery(queryParameters, sortBy, direction);
  const createQuery = listingClient
    .createQuery()
    .rows(pageSize)
    .q(sortQuery);

  if (sortBy === 'default') {
    createQuery.sort({
      product_status: constant.SORTING.DESCENDING,
      is_premium: constant.SORTING.DESCENDING,
      score: constant.SORTING.DESCENDING,
    });
  }

  return listingClient.searchAsync(createQuery);
};

export const buildFilterQuery = (
  queryParameters: RequestQueryParameters
): string => {
  const { filters } = queryParameters.body;
  const fieldRangeMapping = {
    priceRange: 'price',
    landSizeRange: 'landSize',
    builtupSizeRange: 'builtUp',
    bedroomRange: 'bedroom',
    bathroomRange: 'bathroom',
  };
  return _.reduce(
    filters,
    (result: Array<string>, value: Object, key: string): Array<string> => {
      if (!_.isUndefined(fieldRangeMapping[key])) {
        const rQuery = rangeQuery(fieldRangeMapping[key], value.min, value.max);
        if (!_.isUndefined(rQuery)) result.push(rQuery);
      }
      return result;
    },
    []
  ).join(constant.COMMON.TEXT_AND_WITH_SPACE);
};

const forceNumFound = (solrResult: Object, pageSize: number): Object => {
  if (ngroups > pageSize) solrResult.response.numFound = ngroups;
  ngroups = 0;
  return solrResult;
};

const rangeQuery = (field: string, min: number = 0, max: number = 0): any => {
  if (_.isEmpty(max) && _.isEmpty(min)) return;
  return `${FIELD_MAP[field]}: [${min > 0 ? min : '*'} TO ${
    max > 0 ? max : '*'
  }]`;
};

export default {
  defaultSearchAndSort: async(
    queryParameters: RequestQueryParameters,
    sortBy: string = 'default',
    direction: string = 'asc'
  ): Promise<Array<Object>> => {
    let listings = await searchByProject(queryParameters, sortBy, direction);
    const { pageSize } = queryParameters.query;
    listings = forceNumFound(listings, pageSize);
    return resolveSolrResponse(listings);
  },
  searchAndSort: async(
    queryParameters: RequestQueryParameters,
    sortBy: string,
    direction: string
  ): Promise<Array<Object>> => {
    let listings = await searchAndSortProject(
      queryParameters,
      sortBy,
      direction
    );
    const { pageSize } = queryParameters.query;
    listings = forceNumFound(listings, pageSize);
    return resolveSolrResponse(listings);
  },
};
