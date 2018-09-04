// @flow
import SolrClient from '../../libs/connections/SolrClient';
import constant from '../../config/constants';
import { resolveSolrResponse } from '../../helpers/resolver';
import { replaceSpaceWithAsterisk } from '../../helpers/stringHelper';
import _ from 'lodash';

const { client: listingClient } = new SolrClient(
  constant.SOLR_TABLE.LISTING_CORE
);
const { client: areaClient } = new SolrClient(constant.SOLR_TABLE.LISTING_AREA);
const baseSolrQuery =
  '(type:np AND status:Online AND -developer_company_id:0) AND ';
const TextORWithSpace = constant.COMMON.TEXT_OR_WITH_SPACE;

async function buildQueryByArea(placeIds: Array<string>): any {
  const areaGroup = 'area_group';
  const parsingPlaceIds = _.map(
    placeIds,
    (item: string): string => `id:${item}`
  ).join(TextORWithSpace);
  const createQuery = areaClient
    .createQuery()
    .q(parsingPlaceIds)
    .fl([areaGroup]);
  const areaResponse = await areaClient.searchAsync(createQuery);
  const resolveResponse = resolveSolrResponse(areaResponse);

  return _.size(resolveResponse) > 0 ?
    _.map(
      resolveResponse,
      (item: Object): string =>
        `area_exact:(*${replaceSpaceWithAsterisk(item[areaGroup])}*)`
    ).join(TextORWithSpace) + TextORWithSpace :
    '';
}

async function buildQueryByDeveloper(placeIds: Array<string>): any {
  return _.map(
    placeIds,
    (item: string): string => `developer_company_id:(*${item}*)`
  ).join(TextORWithSpace);
}

async function buildQueryByDevelopmentAndUnit(placeIds: Array<string>): any {
  return _.map(placeIds, (item: string): string => `id:${item}`).join(
    TextORWithSpace
  );
}

async function searchByPlaceIds(body: Object, query: Object): Object {
  const { pageSize, nextPageToken } = query;
  const { placeIds } = body;

  if (_.isEmpty(placeIds)) {
    return [];
  }

  const queryArea = await buildQueryByArea(placeIds);
  const queryDeveloper = await buildQueryByDeveloper(placeIds);
  const queryDevelopmentAndUnit = await buildQueryByDevelopmentAndUnit(
    placeIds
  );

  const solrQuery = `(
    ${queryArea}${queryDeveloper}${TextORWithSpace}${queryDevelopmentAndUnit}
  )`;
  const createQuery = listingClient
    .createQuery()
    .start((nextPageToken - 1) * pageSize)
    .rows(pageSize)
    .q(baseSolrQuery + solrQuery);

  return listingClient.searchAsync(createQuery);
}

function searchByCustomText(body: Object, query: Object): Array<Object> {
  const { pageSize, nextPageToken } = query;
  const customTexts = _.head(body.customTexts);

  if (_.isEmpty(customTexts)) {
    return [];
  }

  const solrQuery = `project_name:(*${replaceSpaceWithAsterisk(
    customTexts
  )}*) OR description: (*${replaceSpaceWithAsterisk(customTexts)}*)`;
  const createQuery = listingClient
    .createQuery()
    .start((nextPageToken - 1) * pageSize)
    .rows(pageSize)
    .q(baseSolrQuery + solrQuery);
  return listingClient.searchAsync(createQuery);
}

export default {
  searchListing: async(body: Object, query: Object): Object => {
    const placeIds = await searchByPlaceIds(body, query);
    const customText = await searchByCustomText(body, query);
    return [
      ...resolveSolrResponse(placeIds),
      ...resolveSolrResponse(customText),
    ];
  },
};
