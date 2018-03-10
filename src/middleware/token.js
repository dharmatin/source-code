// @flow
import userInfoTokenService from '../services/userInfoTokenService';
import { handlerUnauthorized } from '../libs/responseHandler';
import _ from 'lodash';

export const setUserInfoToken = async (req: any, res: any, next: any): any => {
  const token = !_.isNil(req.get('Authorization'))
    ? req.get('Authorization')
    : '';
  const userInfo = await userInfoTokenService.getUserInfoToken(token);
  if (!_.isEmpty(token) && _.isEmpty(userInfo)) {
    handlerUnauthorized(res);
  } else {
    req.userInfo = userInfo;
    next();
  }
};

export default setUserInfoToken;
