import chai from 'chai';
import sinon from 'sinon';
import chaiAsPromised from 'chai-as-promised';
import sinonChai from 'sinon-chai';
import userInfo from '../fixture/userInfo';
import UserInfoTokenDao from '../../src/dao/userInfoToken';
import { UserInfoTokenService } from '../../src/services/userInfoTokenService';

chai.use(chaiAsPromised);
chai.use(sinonChai);
const {expect} = chai;
const sandbox = sinon.createSandbox();

describe('Authentication middleware', () => {
  afterEach(() => {
    sandbox.restore();
  });

  describe('#getUserInfo', () => {
    it('Should be return user info from token', async() => {
      const baseReponse = userInfo;
      const token = baseReponse.access_token;
      sandbox.stub(UserInfoTokenDao, 'searchUserByToken').callsFake(() => baseReponse);
      const userInfoService = new UserInfoTokenService(UserInfoTokenDao);
      const result = await userInfoService.getUserInfoToken(token);

      return expect(result).to.deep.equal({
        userID: result.userID,
        userGroup: result.userGroup,
        accessToken: result.accessToken
      });
    });

    it('Should throw error when token is empty', () => {
      sandbox.stub(UserInfoTokenDao, 'searchUserByToken').callsFake(() => null);
      const token = '';
      const userInfoService = new UserInfoTokenService(UserInfoTokenDao);
      const result = userInfoService.getUserInfoToken(token);

      return expect(result).to.be.eventually.rejectedWith('Redis search error!').and.be.an.instanceOf(Error);
    });
  });
});
