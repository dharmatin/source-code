// @flow
import type {UserInfoToken} from './types';
import _ from 'lodash';

export const formatterUserInfoToken = (userInfo: string): UserInfoToken => {
  const response = {};

  if (!_.isNil(userInfo)) {
    const dataUserInfo = JSON.parse(userInfo);
    response.userGroup = dataUserInfo.user_group;
  	response.userID = dataUserInfo.user_id;
  	response.accessToken = dataUserInfo.access_token;
  }

  return response;
};
