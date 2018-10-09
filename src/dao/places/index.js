// @flow
import Redis from '../../libs/connections/RedisClient';
import {
  resolveRedisResponse,
  resolveSolrResponse,
} from '../../helpers/resolver';
import SolrClient from '../../libs/connections/SolrClient';
import constants from '../../config/constants';

const { SOLR_TABLE: { LISTING_CORE }, SORTING: { ASCENDING } } = constants;
const { client: listingClient } = new SolrClient(LISTING_CORE);

export default {
  getDataExplorePopularLocation: async(): ?Object => {
    const REDIS_DB = 0;
    const KEY_PREFIX = 'pb_popular_location_new';
    const { client: redisClient } = new Redis(REDIS_DB);
    const result = await redisClient.getAsync(KEY_PREFIX);
    redisClient.quit();

    return resolveRedisResponse(result);
  },
  getDataPopularPlaces: async(): Object => {
    const cityName = 'city_name';
    const field = [[cityName], 'province_name'];
    const createQuery = listingClient
      .createQuery()
      .q('(type:np AND status:Online AND -developer_company_id:0)')
      .group({ on: true, field: cityName, main: true })
      .sort({ [cityName]: ASCENDING })
      .fl(field);
    const resultQuery = await listingClient.searchAsync(createQuery);

    return resolveSolrResponse(resultQuery).items;
  },
};
