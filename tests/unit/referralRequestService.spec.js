import chai from 'chai';
import sinon from 'sinon';
import chaiAsPromised from 'chai-as-promised';
import sinonChai from 'sinon-chai';

import daoListing from '../../src/dao/listings';
import daoReferral from '../../src/dao/referrals';
import { ReferralRequestService } from '../../src/services/referralRequestService';
import config from '../../src/config';
import emailReferralRequestDeveloperDataCollector from '../../src/services/referrals/emails/dataCollectors/referralRequestDeveloper';
import emailReferralRequestAgentDataCollector from '../../src/services/referrals/emails/dataCollectors/referralRequestAgent';
import requestEmailCollectorToDeveloper from '../fixture/requestEmailCollectorToDeveloper.json';
import requestEmailCollectorToAgent from '../fixture/requestEmailCollectorToAgent.json';
import emailQueueService from '../../src/services/emailQueueService';

chai.use(chaiAsPromised);
chai.use(sinonChai);
const {expect} = chai;
const sandbox = sinon.createSandbox();
const param = {
  listingId: 'nps1045',
  listerId: 1,
  messageRequest: '',
  isSubscribed: 1
};

describe('Response Request referral', () => {
  afterEach(() => {
    sandbox.restore();
  });

  before(() => {
    config.lang = 'id';
    config.translator = require(`../../src/config/locales/${config.lang}.json`);
  });

  it('When success Should be response message success', async() => {
    const formatResponse = {
      response: {
        numFound: 1,
        docs: [{
          is_referral: 1
        }]
      },
    };
    const referralList = {};
    const requestResponses = {
      userId: '1'
    };
    sandbox.stub(daoReferral, 'checkReferral').callsFake(() => referralList);
    sandbox.stub(daoReferral, 'requestReferral').callsFake(() => requestResponses);
    sandbox.stub(daoListing, 'searchProject').callsFake(() => formatResponse);
    sandbox.stub(emailReferralRequestDeveloperDataCollector, 'collect').callsFake(async() => requestEmailCollectorToDeveloper);
    sandbox.stub(emailReferralRequestAgentDataCollector, 'collect').callsFake(async() => requestEmailCollectorToAgent);
    sandbox.stub(emailQueueService, 'save').callsFake(async() => true);
    const referral = new ReferralRequestService(daoReferral, daoListing);
    const referralRequest = await referral.requestReferral(param);
    return expect(referralRequest).to.deep.equal('success');
  });

  it('When failed Should be response message failed', async() => {
    const formatResponse = {
      response: {
        numFound: 1,
        docs: [{
          is_referral: 1
        }]
      },
    };
    const referralList = {};
    const requestResponses = {
      userId: '12345'
    };
    sandbox.stub(daoReferral, 'checkReferral').callsFake(() => referralList);
    sandbox.stub(daoReferral, 'requestReferral').callsFake(() => requestResponses);
    sandbox.stub(daoListing, 'searchProject').callsFake(() => formatResponse);
    const referral = new ReferralRequestService(daoReferral, daoListing);
    const referralRequest = await referral.requestReferral(param);
    return expect(referralRequest).to.deep.equal('failed');
  });

  it('When Pending or Active Should be response message failed', async() => {
    const formatResponse = {
      response: {
        numFound: 1,
        docs: [{
          is_referral: 1
        }]
      },
    };
    const referralList = {
      agentReferralId: 1
    };
    sandbox.stub(daoReferral, 'checkReferral').callsFake(() => referralList);
    sandbox.stub(daoListing, 'searchProject').callsFake(() => formatResponse);
    const referral = new ReferralRequestService(daoReferral, daoListing);
    const referralRequest = await referral.requestReferral(param);
    return expect(referralRequest).to.deep.equal('failed');
  });

  it('When No listing data Should be response message failed ', async() => {
    const formatResponse = {
      response: {
        numFound: 0,
      },
    };

    sandbox.stub(daoListing, 'searchProject').callsFake(() => formatResponse);
    const referral = new ReferralRequestService(daoReferral, daoListing);
    const referralRequest = await referral.requestReferral(param);
    return expect(referralRequest).to.deep.equal('failed');
  });
});
