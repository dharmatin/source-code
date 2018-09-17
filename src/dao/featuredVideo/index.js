// @flow
import Redis from '../../libs/connections/RedisClient';

export default {
  getVideos: async(): ?Object => {
    const REDIS_DB = 0;
    const KEY_PREFIX = 'pb_homepage_video';
    const { client: redisClient } = new Redis(REDIS_DB);
    const result = await redisClient.getAsync(KEY_PREFIX);
    redisClient.quit();

    return JSON.parse(result);
  },
};
