import _ from 'lodash';
import constant from '../config/constants';
import { replaceSpaceWithAsterisk } from './stringHelper';

const baseSolrQuery = '(type:np AND status:Online AND -developer_company_id:0)';

const FILTER_FIELD = {
  priceRange: {
    min: 'price_min_sort',
    max: 'price_max_sort',
  },
  builtupSizeRange: {
    min: 'building_size_min',
    max: 'building_size_max',
  },
  landSizeRange: {
    min: 'land_size_min',
    max: 'land_size_max',
  },
  bathroomRange: {
    min: 'bathroom_min',
    max: 'bathroom_max',
  },
  bedroomRange: {
    min: 'bedroom_min',
    max: 'bedroom_max',
  },
};

const SORT_FIELD = {
  default: {
    product_status: constant.SORTING.DESCENDING,
    is_premium: constant.SORTING.DESCENDING,
    score: constant.SORTING.DESCENDING,
  },
  'price-asc': {
    price_min_sort: constant.SORTING.ASCENDING,
    price_max_sort: constant.SORTING.ASCENDING,
  },
  'price-desc': {
    price_max_sort: constant.SORTING.DESCENDING,
    price_min_sort: constant.SORTING.DESCENDING,
  },
  'builtup-asc': {
    building_size_min: constant.SORTING.ASCENDING,
  },
  'builtup-desc': {
    building_size_max: constant.SORTING.DESCENDING,
  },
  'landarea-asc': {
    land_size_min: constant.SORTING.ASCENDING,
  },
  'landarea-desc': {
    land_size_max: constant.SORTING.DESCENDING,
  },
  'posted-asc': {
    created_date: constant.SORTING.ASCENDING,
  },
  'posted-desc': {
    created_date: constant.SORTING.DESCENDING,
  },
  'published-asc': {
    active: constant.SORTING.ASCENDING,
  },
  'published-desc': {
    active: constant.SORTING.DESCENDING,
  },
};

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

const makeQuery = (body: Object): string => {
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

const buildFilterQuery = filters => {
  return _.reduce(
    filters,
    (result: Array<string>, value: Object, key: string): Array<string> => {
      if (!_.isUndefined(FILTER_FIELD[key])) {
        let query = '';
        const min = _.get(value, 'min', '');
        const max = _.get(value, 'max', '');
        if (key === 'priceRange') {
          query = buildPriceRangeFilterQuery(min, max);
        } else {
          if (min && max) {
            query = `${FILTER_FIELD[key].min}:[${min} TO *] AND ${
              FILTER_FIELD[key].max
            }:[* TO ${max}]`;
          } else if (min) {
            query = `${FILTER_FIELD[key].min}:[${min} TO *]`;
          } else if (max) {
            query = `${FILTER_FIELD[key].max}:[* TO ${max}]`;
          }
        }

        if (!_.isEmpty(query)) result.push(query);
      }
      return result;
    },
    []
  ).join(constant.COMMON.TEXT_AND_WITH_SPACE);
};

const buildPriceRangeFilterQuery = (min, max) => {
  let queryMin = '';
  let queryMax = '';
  if (!_.isEmpty(min) && !_.isEmpty(max)) {
    queryMin = `(${FILTER_FIELD['priceRange'].min}:[${min} TO *] AND ${
      FILTER_FIELD['priceRange'].min
    }:[* TO ${max}])`;
    queryMax = `(${FILTER_FIELD['priceRange'].max}:[${min} TO *] AND ${
      FILTER_FIELD['priceRange'].max
    }:[* TO ${max}])`;
  } else if (!_.isEmpty(min)) {
    queryMin = `(${FILTER_FIELD['priceRange'].min}:[${min} TO *])`;
    queryMax = `(${FILTER_FIELD['priceRange'].max}:[${min} TO *])`;
  } else if (!_.isEmpty(max)) {
    queryMax = `(${FILTER_FIELD['priceRange'].max}:[* TO ${max}])`;
    queryMin = `(${FILTER_FIELD['priceRange'].min}:[* TO ${max}])`;
  }
  return _.compact([queryMin, queryMax]).join(
    constant.COMMON.TEXT_OR_WITH_SPACE
  );
};

const buildSortQuery = sortType => {
  return SORT_FIELD[sortType];
};

export default queryParameters => {
  const { body, body: { filters }, body: { sortBy } } = queryParameters;
  const defaultQuery = makeQuery(body);
  const filterQuery = buildFilterQuery(filters);
  const sort = buildSortQuery(_.isEmpty(sortBy) ? 'default' : sortBy);
  const q = _.compact([defaultQuery, filterQuery]).join(
    constant.COMMON.TEXT_AND_WITH_SPACE
  );

  return { q, sort };
};
