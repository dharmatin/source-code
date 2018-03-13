// @flow
import _ from 'lodash';
import Sequelize from 'sequelize';
import referralDao from '../dao/referrals';
import type { AgentReferral } from '../dao/referrals/type';
import { extractAdsId, getReferralCode } from '../libs/utility';

const STATUS = {
  APPROVED: 1,
  PENDING: -1,
  REJECT: 0,
  REMOVE: 2
};

export class ReferralApprovalService {
  referral: Object;
  listerId: number;
  listingId: number;

  constructor(referral: Object) {
    this.referral = referral;
    this.listerId = 0;
    this.listingId = 0;
  }
  async requestApprove(listerId: number, listingId: string): Promise<boolean> {
    const listingIdDescription: Object = extractAdsId(listingId);
    this.setListerId(listerId);
    this.setListingId(listingIdDescription.id);

    return this.isApproved();
  }

  async isApproved(): Promise<boolean> {
    const referral = await this.getLatestRefferalId();
    const affectedRowsUpdated = await this.updateLatestReferral(referral);

    return affectedRowsUpdated > 0;
  }

  async getLatestRefferalId(): Promise<AgentReferral> {
    try {
      const referral: AgentReferral = await referralDao.getLatestReferralRequest({
        userId: this.getListerId(),
        adsProjectId: this.getListingId(),
        referralStatus: STATUS.PENDING
      });

      return referral;
    } catch (e) {
      throw new Error(`Search latest referral id is null`);
    }
  }
  async updateLatestReferral(referral: AgentReferral): Promise<number> {
    const approvedData: Object = {
      referralStatus: STATUS.APPROVED,
      approvedDate: Sequelize.fn('NOW', 3),
      referralCode: getReferralCode()
    };
    const affectedRows = await referralDao.updateRefferalById(referral.agentReferralId, approvedData);

    return affectedRows;
  }
  setListingId(listingId: number) {
    this.listingId = listingId;
  }

  setListerId(listerId: number) {
    this.listerId = listerId;
  }

  getListingId(): number {
    return this.listingId;
  }

  getListerId(): number {
    return this.listerId;
  }
}

export default new ReferralApprovalService(referralDao);
