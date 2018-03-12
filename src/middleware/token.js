// @flow
import userInfoTokenService from '../services/userInfoTokenService';
import { handlerUnauthorized } from '../libs/responseHandler';
import _ from 'lodash';

export const setUserInfoToken = async(req: any, res: any, next: any): any => {
  const token: string = !_.isNil(req.get('Authorization')) ?
    req.get('Authorization') :
    '';
  const userInfo: Object = !_.isEmpty(token) ? await userInfoTokenService.getUserInfoToken(token) : null;
  if (!_.isEmpty(token) && _.isEmpty(userInfo)) {
    handlerUnauthorized(res);
  } else {
    req.userInfo = userInfo;
    next();
  }
};

export default setUserInfoToken;
