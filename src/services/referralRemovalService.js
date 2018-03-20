// @flow
import _ from 'lodash';
import Sequelize from 'sequelize';
import referralDao from '../dao/referrals';
import type { AgentReferral } from '../dao/referrals/type';
import { extractListingId } from '../libs/utility';
import config from '../config';

export class ReferralRemovalService {
  referral: Object;
  listerId: number;
  listingId: number;
  referralReason: string;

  constructor(referral: Object) {
    this.referral = referral;
    this.listerId = 0;
    this.listingId = 0;
  }

  async removeListerFromReferral(request: Object): Promise<boolean> {
    const listingIdDescription: Object = extractListingId(request.listingId);
    this._setListerId(request.listerId);
    this._setListingId(listingIdDescription.id);
    this._setReferralReason(request.referralReason);

    if (_.isNil(request.referralReason)) {
      return false;
    } else {
      return this.isListerRemoveFromReferral();
    }
  }

  async isListerRemoveFromReferral(): Promise<boolean> {
    const referral = await this.getLatestRefferal();
    if (!_.isEmpty(referral)) {
      const affectedRowsUpdated = await this.updateLatestReferral(referral);
      return affectedRowsUpdated > 0;
    } else {
      return false;
    }
  }

  async getLatestRefferal(): Promise<AgentReferral> {
    const referral: AgentReferral = await referralDao.getLatestReferralRequest({
      userId: this._getListerId(),
      adsProjectId: this._getListingId(),
      referralStatus: config.STATUS_REFERRAL.APPROVED,
    });

    return referral;
  }

  async updateLatestReferral(referral: AgentReferral): Promise<number> {
    const approvedData: Object = {
      referralStatus: config.STATUS_REFERRAL.REMOVE,
      referralReason: this._getReferralReason(),
      rejectedDate: Sequelize.fn('NOW', 3),
    };
    const affectedRows = await referralDao.updateRefferalById(
      referral.agentReferralId,
      approvedData
    );

    return affectedRows;
  }
  _setListingId(listingId: number) {
    this.listingId = listingId;
  }

  _setListerId(listerId: number) {
    this.listerId = listerId;
  }

  _setReferralReason(referralReason: string) {
    this.referralReason = referralReason;
  }

  _getListingId(): number {
    return this.listingId;
  }

  _getListerId(): number {
    return this.listerId;
  }

  _getReferralReason(): string {
    return this.referralReason;
  }
}

export default new ReferralRemovalService(referralDao);
