// @flow
import userInfoToken from '../dao/userInfoToken';
import { formatUserInfoToken } from './formatters/userInfoTokenFormatter';

export class UserInfoTokenService {
  userInfo: Object;

  constructor(userInfo: Object) {
    this.userInfo = userInfo;
  }

  async getUserInfoToken(token: string): Object {
    try {
      const result: Object = await this.userInfo.searchUserByToken(token);

      return formatUserInfoToken(result);
    } catch (e) {
      throw new Error('Redis search error!');
    }
  }
}

export default new UserInfoTokenService(userInfoToken);
