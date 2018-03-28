// @flow
import _ from 'lodash';
import Sequelize from 'sequelize';
import referralDao from '../dao/referrals';
import type { AgentReferral } from '../dao/referrals/type';
import { extractListingId } from '../libs/utility';
import emailQueueService from './emailQueueService';
import emailReferralRemoveDataCollector from './referrals/emails/dataCollectors/referralRemove';
import config from '../config';

export class ReferralRemovalService {
  referral: Object;
  listerId: number;
  listingId: number;
  referralReason: string;
  listingIds: string;

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
    this._setListingIds(request.listingId);

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

      const emailQueueData = emailReferralRemoveDataCollector.collect({
        listingId: this._getListingIds(),
        listerId: this._getListerId(),
        referralCode: '0',
      });

      emailQueueData
        .then((data: Object) => {
          _.unset(data.jsonData, 'similarProject');
          const queuedEmail = emailQueueService
            .to(data.to)
            .from(data.from)
            .subject(data.subject)
            .jsonData(data.jsonData)
            .template(data.template)
            .save();
          queuedEmail.catch((err: any) => {
            throw new Error(err);
          });
        })
        .catch((err: any) => {
          throw new Error(err);
        });

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
      removedDate: Sequelize.fn('NOW', 3),
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

  _setListingIds(listingIds: string) {
    this.listingIds = listingIds;
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

  _getListingIds(): string {
    return this.listingIds;
  }
}

export default new ReferralRemovalService(referralDao);
