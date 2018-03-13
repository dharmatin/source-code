// @flow
import { handleUnauthorized } from '../libs/responseHandler';
import _ from 'lodash';

const USER_GROUP = {
  CUSTOMER: 2,
  DEVELOPER: 32
};
export const handleUserGroupCustomer = async(req: any, res: any, next: any): any => {
  if (!_.isEmpty(req.userInfo) && parseInt(req.userInfo.userGroup) === USER_GROUP.CUSTOMER) {
    next();
  } else {
    handleUnauthorized(res);
  }
};

export const handleUserGroupDeveloper = async(req: any, res: any, next: any): any => {
  if (!_.isEmpty(req.userInfo) && parseInt(req.userInfo.userGroup) === USER_GROUP.DEVELOPER) {
    next();
  } else {
    handleUnauthorized(res);
  }
};
