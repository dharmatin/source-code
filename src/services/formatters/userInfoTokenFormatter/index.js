// @flow
import type { UserInfoToken } from './types';
import _ from 'lodash';

export const formatUserInfoToken = (userInfo: any): UserInfoToken => {
  const response = {};
  if (!_.isNull(userInfo)) {
    response.userGroup = userInfo.user_group;
    response.userID = userInfo.user_id;
    response.developerCompanyId = !_.isNil(userInfo.developerCompanyId) ? userInfo.developerCompanyId : '0';
    response.accessToken = userInfo.access_token;
  }
  return response;
};
