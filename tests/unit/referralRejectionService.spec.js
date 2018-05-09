// @flow
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import Sequelize from 'sequelize';
import ReferralDao from '../../src/dao/referrals';
import type { AgentReferral } from '../../src/dao/referrals/type';
import { ReferralRejectionService } from '../../src/services/referralRejectionService';
import requestReferralApproval from '../fixture/requestReferralApproval.json';

declare var describe: any;
declare var it: any;
declare var afterEach: any;

chai.use(chaiAsPromised);
chai.use(sinonChai);

const { expect } = chai;
const sandbox = sinon.createSandbox();

describe('Referral reject services', () => {
  const referral: AgentReferral = {
    agentReferralId: 1,
    userId: 70491,
    adsProjectId: 499,
    adsId: 0,
    propertyType: 'np',
    propertyCategory: 's',
    messageRequest: '',
    referralCode: 'ABCD1234',
    referralStatus: -1,
    referralReason: Sequelize.default,
    createdDate: new Date(),
    approvedDate: new Date(),
    rejectedDate: new Date(),
    removedDate: new Date(),
  };

  const rejectRequest: Object = {
    listerId: requestReferralApproval.listerId,
    listingId: requestReferralApproval.listingId,
    referralReason: 'reason',
  };

  afterEach(() => {
    sandbox.restore();
  });

  it('Should be return true if the update process last request affected more than 0', (): any => {
    sandbox
      .stub(ReferralDao, 'getLatestReferralRequest')
      .callsFake((): AgentReferral => referral);
    sandbox.stub(ReferralDao, 'updateRefferalById').callsFake((): number => 1);
    const referralApprovalService = new ReferralRejectionService(ReferralDao);
    const result = referralApprovalService.rejectReferral(rejectRequest);

    return expect(result).to.be.eventually.equal(true);
  });

  it('Should be return false if the update process last request affected equal 0', (): any => {
    sandbox
      .stub(ReferralDao, 'getLatestReferralRequest')
      .callsFake((): AgentReferral => referral);
    sandbox.stub(ReferralDao, 'updateRefferalById').callsFake((): number => 0);
    const referralApprovalService = new ReferralRejectionService(ReferralDao);
    const result = referralApprovalService.rejectReferral(rejectRequest);

    return expect(result).to.be.eventually.equal(false);
  });

  it('Should be return false if the combination of lister id and listing id not found in database', (): any => {
    const { referral: dao } = ReferralDao;
    sandbox.stub(dao, 'findOne').callsFake((): ?Object => null);
    const referralApprovalService = new ReferralRejectionService(ReferralDao);
    const result = referralApprovalService.rejectReferral(rejectRequest);

    return expect(result).to.be.eventually.to.be.eventually.equal(false);
  });

  it('Should be return false if the request body referralReason is undefined', (): any => {
    const referralApprovalService = new ReferralRejectionService(ReferralDao);
    const result = referralApprovalService.rejectReferral({
      listerId: requestReferralApproval.listerId,
      listingId: requestReferralApproval.listingId,
      referralReason: undefined,
    });

    return expect(result).to.be.eventually.to.be.eventually.equal(false);
  });
});
