// @flow
import type { UserInfoToken } from './types';

export const formatterUserInfoToken = (userInfo: Object): UserInfoToken => {
  const response = {};
  response.userGroup = userInfo.user_group;
  response.userID = userInfo.user_id;
  response.accessToken = userInfo.access_token;

  return response;
};
