// @flow
import Redis from '../../libs/connections/RedisClient';
import { resolveRedisResponse } from '../../helpers/resolver';

export default {
  getDataExplorePopularLocation: async(): ?Object => {
    const REDIS_DB = 0;
    const KEY_PREFIX = 'pb_popular_location_new';
    const { client: redisClient } = new Redis(REDIS_DB);
    const result = await redisClient.getAsync(KEY_PREFIX);
    redisClient.quit();

    return resolveRedisResponse(result);
  },
};
