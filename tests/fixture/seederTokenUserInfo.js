import redis from 'redis';
import data from './userInfo.json';
import bluebird from 'bluebird';
import config from '../../src/config';

(() => {
  const env = process.env.NODE_ENV;
  // const env = process.env.NODE_ENV;
  // const feedUserInfo = async() => {
  //   const redisClient = bluebird.promisifyAll(redis.createClient({
  //     host: config[env].redis.host,
  //     port: config[env].redis.port,
  //     db: 1
  //   }));
  //   let userInfo;
  //   try {
  //     userInfo = await redisClient.getAsync(`oauth_access_tokens:${data.token}`);
  //     console.log('USER INFO', userInfo);
  //   } catch (e) {

  //   }
  // };

  // await feedUserInfo();
})();
