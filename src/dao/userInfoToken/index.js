// @flow
import Redis from '../../libs/connections/RedisClient';

export default {
  searchUserByToken: async(token: string) => {
    const REDIS_DB = 1;
    const KEY_PREFIX = 'oauth_access_tokens';
    const {client: redisClient} = new Redis(REDIS_DB);
    const client = redisClient.getAsync(`${KEY_PREFIX}:${token}`);
    redisClient.quit();

    return client;
  }
};
