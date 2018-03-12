import chai from 'chai';
import sinon from 'sinon';
import chaiAsPromised from 'chai-as-promised';
import sinonChai from 'sinon-chai';

import daoListing from '../../src/dao/listings';
import daoReferral from '../../src/dao/referrals';
import { ReferralService } from '../../src/services/referralService';

chai.use(chaiAsPromised);
chai.use(sinonChai);
const {expect} = chai;
const sandbox = sinon.createSandbox();

describe('Response Request referral', () => {
  afterEach(() => {
    sandbox.restore();
  });

  it('When Success Should be response message Success', async() => {
    const formatResponse = {
      response: {
        numFound: 1,
      },
    };
    const checkResponse = null;
    const requestResponses = {
      userId: '123456'
    };
    sandbox.stub(daoReferral, 'checkReferral').callsFake(() => checkResponse);
    sandbox.stub(daoReferral, 'requestReferral').callsFake(() => requestResponses);
    sandbox.stub(daoListing, 'searchProject').callsFake(() => formatResponse);
    const referral = new ReferralService(daoReferral, daoListing);
    const referralRequest = await referral.requestReferral('123456', 'nps449');
    return expect(referralRequest).to.deep.equal({message: 'Success'});
  });

  it('When Failed Should be response message Failed', async() => {
    const formatResponse = {
      response: {
        numFound: 1,
      },
    };
    const checkResponse = null;
    const requestResponses = {
      userId: '12345'
    };
    sandbox.stub(daoReferral, 'checkReferral').callsFake(() => checkResponse);
    sandbox.stub(daoReferral, 'requestReferral').callsFake(() => requestResponses);
    sandbox.stub(daoListing, 'searchProject').callsFake(() => formatResponse);
    const referral = new ReferralService(daoReferral, daoListing);
    const referralRequest = await referral.requestReferral('123456', 'nps449');
    return expect(referralRequest).to.deep.equal({message: 'Failed'});
  });

  it('When Pending Should be response message Failed', async() => {
    const formatResponse = {
      response: {
        numFound: 1,
      },
    };
    const checkResponse = {
      referralStatus: -1
    };
    sandbox.stub(daoReferral, 'checkReferral').callsFake(() => checkResponse);
    sandbox.stub(daoListing, 'searchProject').callsFake(() => formatResponse);
    const referral = new ReferralService(daoReferral, daoListing);
    const referralRequest = await referral.requestReferral('123456', 'nps449');
    return expect(referralRequest).to.deep.equal({message: 'Failed'});
  });

  it('When In Active Should be response message failed', async() => {
    const formatResponse = {
      response: {
        numFound: 1,
      },
    };
    const checkResponse = {
      referralStatus: 1
    };
    sandbox.stub(daoReferral, 'checkReferral').callsFake(() => checkResponse);
    sandbox.stub(daoListing, 'searchProject').callsFake(() => formatResponse);
    const referral = new ReferralService(daoReferral, daoListing);
    const referralRequest = await referral.requestReferral('123456', 'nps449');
    return expect(referralRequest).to.deep.equal({message: 'Failed'});
  });

  it('When No listing data Should be response message failed ', async() => {
    const formatResponse = {
      response: {
        numFound: 0,
      },
    };

    sandbox.stub(daoListing, 'searchProject').callsFake(() => formatResponse);
    const referral = new ReferralService(daoReferral, daoListing);
    const referralRequest = await referral.requestReferral('123456', 'nps449');
    return expect(referralRequest).to.deep.equal({message: 'Failed'});
  });
});
