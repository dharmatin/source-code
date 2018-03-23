// @flow
import _ from 'lodash';
import moment from 'moment';
import referralCore from '../dao/referrals';
import listingCore from '../dao/listings';
import { extractListingId } from '../libs/utility';
import { formatStatusReferral } from './formatters/referralFormatter';
import emailQueueService from './emailQueueService';
import emailReferralRequestAgentDataCollector from './referrals/emails/dataCollectors/referralRequestAgent';

export class ReferralRequestService {
  referral: Object;
  listings: Object;
  referralListingId: Object;
  listerId: number;
  listingId: string;
  projectId: number;
  referralCode: string;

  constructor(referral: Object, listings: Object) {
    this.referral = referral;
    this.listings = listings;
  }

  async requestReferral(params: Object): Promise<string> {
    this._setFormatListingId(params.listingId);
    let message = 'Failed';
    const listingIdDescription: Object = extractListingId(params.listerId);
    this._setListerId(params.listerId);
    this._setListingId(params.listingId);
    this._setProjectId(listingIdDescription.id);

    const agentParam = {
      userId: params.listerId,
      adsProjectId: extractListingId(params.listingId).id,
      propertyType: extractListingId(params.listingId).type
    };

    const getListing = await this.listings.searchProject(params.listingId);

    if (getListing.response.numFound > 0) {
      const isExist = await this.checkingReferral(agentParam);

      if (isExist) {
        const result = await this.requestingReferral(_.assign(agentParam, {messageRequest: params.messageRequest, 'propertyCategory': 's'}), params.isSubscribed);
        if (result) {
          const emailQueueData = emailReferralRequestAgentDataCollector.collect({
            listingId: this._getListingId(),
            listerId: this._getListerId(),
            referralCode: this._getReferralCode()
          });

          emailQueueData.then((data: Object) => {
            const queuedEmail = emailQueueService
              .to(data.to)
              .from(data.from)
              .subject(data.subject)
              .jsonData(data.jsonData)
              .template(data.template)
              .sendDate(moment().format('YYYY-MM-DD HH:mm:ss.SSS'))
              .save();
            queuedEmail.catch((err: any) => {
              throw new Error(err);
            });
          }).catch((err: any) => {
            throw new Error(err);
          });

          message = 'Success';
        }
      }
    }
    return message;
  }

  async requestingReferral(agentParam: Object, isSubscribed: boolean): Promise<boolean> {
    const request = await this.referral.requestReferral(agentParam, isSubscribed);
    return request.userId === agentParam.userId;
  }

  async checkingReferral(agentParam: Object): Promise<boolean> {
    const result = await this.referral.checkReferral(agentParam);

    return _.isEmpty(result);
  }

  async getLatestRefferal(listerId: number, listingId: string): any {
    let referral = {};
    const listing = await this.listings.searchProject(listingId);
    if (listing.response.numFound > 0 && listing.response.docs[0].is_referral === 1) {
      referral = await this.referral.getLatestReferralRequest({
        userId: listerId,
        adsProjectId: extractListingId(listingId).id
      });
    }

    return formatStatusReferral(referral, listing.response.docs[0]);
  }

  _setFormatListingId(listingId: string) {
    const listingDetail = extractListingId(listingId);
    this.referralListingId = {
      adsProjectId: listingDetail.id,
      propertyType: listingDetail.type,
      propertyCategory: listingDetail.category,
    };
  }

  _getFormatingListingId(): Object {
    return this.referralListingId;
  }

  _setListingId(listingId: string) {
    this.listingId = listingId;
  }

  _setListerId(listerId: number) {
    this.listerId = listerId;
  }

  _setProjectId(id: number) {
    this.projectId = id;
  }

  _getListingId(): string {
    return this.listingId;
  }

  _getListerId(): number {
    return this.listerId;
  }

  _getProjectId(): number {
    return this.projectId;
  }

  _getReferralCode(): string {
    return this.referralCode;
  }
}

export default new ReferralRequestService(referralCore, listingCore);
