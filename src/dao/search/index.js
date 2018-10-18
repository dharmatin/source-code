// @flow
import SolrClient from '../../libs/connections/SolrClient';
import constant from '../../config/constants';
import { resolveSolrResponse } from '../../helpers/resolver';
import type { RequestQueryParameters } from './type';
import listingQueryBuilder from '../../helpers/listingQueryBuilder';

const { client: listingClient } = new SolrClient(
  constant.SOLR_TABLE.LISTING_CORE
);

const search = async(
  queryParameters: RequestQueryParameters
): Promise<Object> => {
  const { query: { pageSize, nextPageToken } } = queryParameters;
  const query = listingQueryBuilder(queryParameters);
  const { q, sort } = query;
  const createQuery = listingClient
    .createQuery()
    .q(q)
    .start((nextPageToken - 1) * pageSize)
    .rows(pageSize)
    .sort(sort);
  return listingClient.searchAsync(createQuery);
};

export default {
  defaultSearchAndSort: async(
    queryParameters: RequestQueryParameters,
    sortBy: string = 'default',
    direction: string = 'asc'
  ): Promise<Array<Object>> => {
    let listings = await search(queryParameters);
    return resolveSolrResponse(listings);
  },
  searchAndSort: async(
    queryParameters: RequestQueryParameters,
    sortBy: string,
    direction: string
  ): Promise<Array<Object>> => {
    let listings = await search(queryParameters);
    return resolveSolrResponse(listings);
  },
};
