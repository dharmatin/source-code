import Redis from '../libs/connections/RedisClient';
import { unAuthorizedResponse } from '../libs/responseHandler';
import _ from 'lodash';

const REDIS_DB = 1;
const KEY_PREFIX = 'oauth_access_tokens';

export const UserInfo = (() => {
  const getUserInfo = async(token) => {
    const {client: redisClient} = new Redis(REDIS_DB);
    redisClient.selectAsync(REDIS_DB);
    const user = await redisClient.getAsync(`${KEY_PREFIX}:${token}`);
    redisClient.quit();

    return JSON.parse(user);
  };

  return {
    getUserInfo: getUserInfo
  };
})();

const tokenMiddleware = async(req, res, next) => {
  const token = !_.isNaN(req.get('Authorization')) ? req.get('Authorization') : null;
  const user = await UserInfo.getUserInfo(token);
  if (token) {
    if (user) {
      req.userInfo = user;
      next();
    } else {
      unAuthorizedResponse(res);
    }
  } else {
    next();
  }
};

export default tokenMiddleware;
