// @flow
import type { UserInfoToken } from './types';
import _ from 'lodash';

export const formatUserInfoToken = (userInfo: Object): UserInfoToken => {
  const response = {};
  if (!_.isNull(userInfo)) {
    response.userGroup = userInfo.user_group;
    response.userID = userInfo.user_id;
    response.accessToken = userInfo.access_token;
  }
  return response;
};
