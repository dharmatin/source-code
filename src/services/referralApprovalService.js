// @flow
import _ from 'lodash';
import Sequelize from 'sequelize';
import referralDao from '../dao/referrals';
import type { AgentReferral } from '../dao/referrals/type';
import { extractListingId, generateReferralCode } from '../libs/utility';
import config from '../config';
import emailQueueService from './emailQueueService';
import emailReferralApprovalDataCollector from './referrals/emails/dataCollectors/referralApproval';

export class ReferralApprovalService {
  referral: Object;
  listerId: number;
  listingId: string;
  projectId: number;
  referralCode: string;

  constructor(referral: Object) {
    this.referral = referral;
    this.listerId = 0;
    this.listingId = '';
    this.projectId = 0;
  }
  async requestApprove(listerId: number, listingId: string): Promise<boolean> {
    const listingIdDescription: Object = extractListingId(listingId);
    this.setListerId(listerId);
    this.setListingId(listingId);
    this.setProjectId(listingIdDescription.id);
    const isReferralApproved = await this.isReferralApproved();
    if (isReferralApproved) {
      const emailQueueData = emailReferralApprovalDataCollector.collect({
        listingId: this.getListingId(),
        listerId: this.getListerId(),
        referralCode: this.getReferralCode(),
      });
      emailQueueData
        .then((data: Object) => {
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
      return true;
    } else {
      return false;
    }
  }

  async isReferralApproved(): Promise<boolean> {
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
      userId: this.getListerId(),
      adsProjectId: this.getProjectId(),
      referralStatus: config.STATUS_REFERRAL.PENDING,
    });

    return referral;
  }

  async updateLatestReferral(referral: AgentReferral): Promise<number> {
    this.setReferralCode(generateReferralCode());
    const approvedData: Object = {
      referralStatus: config.STATUS_REFERRAL.APPROVED,
      approvedDate: Sequelize.fn('NOW', 3),
      referralCode: this.getReferralCode(),
    };
    const affectedRows = await referralDao.updateRefferalById(
      referral.agentReferralId,
      approvedData
    );

    return affectedRows;
  }

  setListingId(listingId: string) {
    this.listingId = listingId;
  }

  setListerId(listerId: number) {
    this.listerId = listerId;
  }

  setProjectId(id: number) {
    this.projectId = id;
  }

  setReferralCode(code: string) {
    this.referralCode = code;
  }

  getListingId(): string {
    return this.listingId;
  }

  getListerId(): number {
    return this.listerId;
  }

  getProjectId(): number {
    return this.projectId;
  }

  getReferralCode(): string {
    return this.referralCode;
  }
}

export default new ReferralApprovalService(referralDao);
