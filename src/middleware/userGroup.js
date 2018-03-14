// @flow
import _ from 'lodash';
import config from '../config';
import { handleUnauthorized } from '../libs/responseHandler';

export const isValidCustomer = async(req: any, res: any, next: any): any => {
  if (!_.isEmpty(req.userInfo) && parseInt(req.userInfo.userGroup) === config.USER_GROUP.CUSTOMER) {
    next();
  } else {
    handleUnauthorized(res);
  }
};

export const isValidDeveloper = async(req: any, res: any, next: any): any => {
  if (!_.isEmpty(req.userInfo) && parseInt(req.userInfo.userGroup) === config.USER_GROUP.DEVELOPER) {
    next();
  } else {
    handleUnauthorized(res);
  }
};
