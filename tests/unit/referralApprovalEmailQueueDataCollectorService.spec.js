// @flow
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import ListingDao from '../../src/dao/listings';
import ListerDao from '../../src/dao/listers';
import { ReferralEmailQueueDataCollectorService } from '../../src/services/referralEmailQueueDataCollectorService';
import EmailQueueService from '../../src/services/emailQueueService';
import config from '../../src/config';
import listing from '../fixture/listingV2.json';
import similarListings from '../fixture/listings.json';
import listers from '../fixture/listers.json';
import approvalDataCollector from '../fixture/approvalEmailCollector.json';

declare var describe: any;
declare var it: any;
declare var afterEach: any;

chai.use(chaiAsPromised);
chai.use(sinonChai);

const { expect } = chai;
const sandbox = sinon.createSandbox();

describe('Referral Email Data Collector Services', () => {
  afterEach(() => {
    sandbox.restore();
  });
  it('Should be return email queue data', async(): any => {
    config.lang = 'id';
    config.translator = require(`../../src/config/locales/${config.lang}.json`);
    sandbox.stub(ListingDao, 'searchProject').callsFake((): any => listing);
    sandbox.stub(ListerDao, 'searchLister').callsFake((): any => listers);
    sandbox.stub(ListingDao, 'searchProjectByOrganisation').callsFake((): any => similarListings);
    const dataCollector = new ReferralEmailQueueDataCollectorService(ListingDao, ListerDao);
    const result = await dataCollector.referralApprove('nps1091', 70491);

    expect(result).to.be.an('object').deep.equal(approvalDataCollector);
  });

  it('Should be return empty email queue data', async(): any => {
    const failedResponse = {
      'response': {
        'numFound': 0,
        'start': 0,
        'docs': []
      }
    };
    const emptyQueueuData = {
      'from': 'no-reply@rumah123.com',
      'to': '',
      'jsonData': {},
      'subject': '',
      'template': ''
    };
    sandbox.stub(ListingDao, 'searchProject').callsFake((): any => failedResponse);
    sandbox.stub(ListerDao, 'searchLister').callsFake((): any => failedResponse);
    sandbox.stub(ListingDao, 'searchProjectByOrganisation').callsFake((): any => failedResponse);
    const dataCollector = new ReferralEmailQueueDataCollectorService(ListingDao, ListerDao);
    const result = await dataCollector.referralApprove('nps1091', 70491);

    expect(result).to.be.an('object').deep.equal(emptyQueueuData);
  });
});
