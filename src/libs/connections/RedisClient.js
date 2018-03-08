import config from '../../config';
import redis from 'redis';
import bluebird from 'bluebird';

export default class RedisClient {
  constructor(db) {
    this.client = bluebird.promisifyAll(redis.createClient({
      host: config.redis.host,
      port: config.redis.port,
      db: db
    }));
  }
}
