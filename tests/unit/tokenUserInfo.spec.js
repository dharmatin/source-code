import chai from 'chai';
import sinon from 'sinon';
import chaiAsPromised from 'chai-as-promised';
import sinonChai from 'sinon-chai';
import {UserInfo} from '../../src/middleware/token';

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
      const baseReponse = {
        access_token: '0ea83d8b56438932225a0bb9be338212bc038959',
        client_type: '2',
        user_id: '70491',
        user_email: '123.superqa@gmail.com',
        user_group: '32',
      };
      const token = '0ea83d8b56438932225a0bb9be338212bc038959';
      sandbox.stub(UserInfo, 'getUserInfo').callsFake(() => baseReponse);
      const result = await UserInfo.getUserInfo(token);

      return expect(result).to.be.an('object')
        .and.have.property('access_token').equal(token);
    });

    it('Should be return null if token is null', () => {
      const token = null;
      const result = UserInfo.getUserInfo(token);

      return expect(result).to.be.eventually.a('null');
    });
  });
});
