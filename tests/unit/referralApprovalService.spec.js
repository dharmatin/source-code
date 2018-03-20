// @flow
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import Sequelize from 'sequelize';
import ReferralDao from '../../src/dao/referrals';
import type { AgentReferral } from '../../src/dao/referrals/type';
import { ReferralApprovalService } from '../../src/services/referralApprovalService';
import requestReferralApproval from '../fixture/requestReferralApproval.json';
import { generateReferralCode } from '../../src/libs/utility';
import config from '../../src/config';

declare var describe: any;
declare var it: any;
declare var afterEach: any;
declare var before: any;

chai.use(chaiAsPromised);
chai.use(sinonChai);

const { expect } = chai;
const sandbox = sinon.createSandbox();

describe('Referral approve services', () => {
  afterEach(() => {
    sandbox.restore();
  });

  before(() => {
    config.lang = 'id';
    config.translator = require(`../../src/config/locales/${config.lang}.json`);
  });

  describe('#getReferralCode', () => {
    it('Should return unique 8 characters alphanumeric with uppercase', (): any => {
      const referralCode = generateReferralCode();
      const regex = new RegExp(/^[A-Z0-9]+$/i);
      expect(regex.test(referralCode)).to.be.true;
      expect(referralCode.length).equal(8);
    });
  });
  describe('#requestApprove', () => {
    const referral: AgentReferral = {
      agentReferralId: 1,
      userId: 70491,
      adsProjectId: 499,
      adsId: 0,
      propertyType: 'np',
      propertyCategory: 's',
      referralCode: 'ABCD1234',
      referralStatus: -1,
      referralReason: Sequelize.default,
      createdDate: new Date(),
      approvedDate: new Date(),
      rejectedDate: new Date(),
      removedDate: new Date()
    };

    it('Should be return true if the update process last request affected more than 0', (): any => {
      sandbox.stub(ReferralDao, 'getLatestReferralRequest').callsFake((): AgentReferral => referral);
      sandbox.stub(ReferralDao, 'updateRefferalById').callsFake((): number => 1);
      const referralApprovalService = new ReferralApprovalService(ReferralDao);
      const result = referralApprovalService.requestApprove(requestReferralApproval.listerId, requestReferralApproval.listingId);

      return expect(result).to.be.eventually.equal(true);
    });

    it('Should be return false if the update process last request affected equal 0', (): any => {
      sandbox.stub(ReferralDao, 'getLatestReferralRequest').callsFake((): AgentReferral => referral);
      sandbox.stub(ReferralDao, 'updateRefferalById').callsFake((): number => 0);
      const referralApprovalService = new ReferralApprovalService(ReferralDao);
      const result = referralApprovalService.requestApprove(requestReferralApproval.listerId, requestReferralApproval.listingId);

      return expect(result).to.be.eventually.equal(false);
    });

    it('Should be return false if the combination of lister id and listing id not found in database', (): any => {
      const { referral: dao } = ReferralDao;
      sandbox.stub(dao, 'findOne').callsFake((): ?Object => null);
      const referralApprovalService = new ReferralApprovalService(ReferralDao);
      const result = referralApprovalService.requestApprove(123, 'nps123');

      return expect(result).to.be.eventually.to.be.eventually.equal(false);
    });
  });
});
