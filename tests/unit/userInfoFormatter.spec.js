// @flow
import chai from 'chai';
import userInfo from '../fixture/userInfo';
import { formatUserInfoToken } from '../../src/services/formatters/userInfoTokenFormatter';
import type{ UserInfoToken } from '../../src/services/formatters/userInfoTokenFormatter/types';

declare var describe: any;
declare var it: any;
const { expect } = chai;

describe('User Info Token Formatter', () => {
  it('Should return an object of UserInfoToken', () => {
    const format: UserInfoToken = formatUserInfoToken(userInfo);
    expect(format).is.an('object').have.property('userGroup').is.a('string');
    expect(format).is.an('object').have.property('userID').is.a('string');
    expect(format).is.an('object').have.property('accessToken').is.a('string');
  });

  /* it('Should return an empty object of UserInfoToken, if userInfo object is empty', () => {
    const format: ?UserInfoToken = formatUserInfoToken(null);
    expect(format).is.an('object').that.is.empty;
  }); */
});
