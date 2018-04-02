// @flow
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import ListingDao from '../../src/dao/listings';
import ListerDao from '../../src/dao/listers';
import referralApproval from '../../src/services/referrals/emails/dataCollectors/referralApproval';
import config from '../../src/config';
import listing from '../fixture/listingV2.json';
import similarListings from '../fixture/listings.json';
import listers from '../fixture/listers.json';
import approvalDataCollector from '../fixture/approvalEmailCollector.json';

declare var describe: any;
declare var it: any;
declare var afterEach: any;
declare var before: any;

chai.use(chaiAsPromised);
chai.use(sinonChai);

const { expect } = chai;
const sandbox = sinon.createSandbox();

describe('Referral Email Data Collector Services', () => {
  before(() => {
    config.lang = 'id';
    config.translator = require(`../../src/config/locales/${config.lang}.json`);
  });
  afterEach(() => {
    sandbox.restore();
  });
  it('Should be return email queue data', async(): any => {
    sandbox.stub(ListingDao, 'searchProject').callsFake((): any => listing);
    sandbox.stub(ListerDao, 'searchLister').callsFake((): any => listers);
    sandbox
      .stub(ListingDao, 'searchProjectByOrganisation')
      .callsFake((): any => similarListings);
    const result = await referralApproval.collect({
      listingId: 'nps1091',
      listerId: 70491,
      referralCode: '',
    });
    expect(result)
      .to.be.an('object')
      .deep.equal(approvalDataCollector);
  });

  it('Should be return empty email queue data', async(): any => {
    const failedResponse = {
      responseHeader: {
        status: 0,
      },
      response: {
        numFound: 0,
        start: 0,
        docs: [],
      },
    };
    const emptyQueueuData = {
      from: 'no-reply@rumah123.com',
      to: '',
      jsonData: {},
      subject: config.translator.email_subject.referral_request_granted,
      template: 'Referrals\\Approval',
    };
    sandbox
      .stub(ListingDao, 'searchProject')
      .callsFake((): any => failedResponse);
    sandbox
      .stub(ListerDao, 'searchLister')
      .callsFake((): any => failedResponse);
    sandbox
      .stub(ListingDao, 'searchProjectByOrganisation')
      .callsFake((): any => failedResponse);
    const result = await referralApproval.collect({
      listingId: 'nps1091',
      listerId: 70491,
      referralCode: '',
    });
    expect(result)
      .to.be.an('object')
      .deep.equal(emptyQueueuData);
  });
});
