// @flow
import _ from 'lodash';
import referralCore from '../dao/referrals';
import listingCore from '../dao/listings';
import { extractListingId } from '../libs/utility';

export class ReferralRequestService {
  referral: Object;
  listings: Object;
  referralListingId: Object;

  constructor(referral: Object, listings: Object) {
    this.referral = referral;
    this.listings = listings;
  }

  async requestReferral(params: Object): Promise<string> {
    this._setFormatListingId(params.listingId);
    let message = 'Failed';
    const agentParam = {
      userId: params.listerId,
      adsProjectId: extractListingId(params.listingId).id,
      propertyType: extractListingId(params.listingId).type
    }
    const getListing = await this.listings.searchProject(params.listingId);
    if (getListing.response.numFound > 0) {
      (await this.checkingReferral(agentParam))
        ? (await this.requestingReferral(_.assign(agentParam, {messageRequest: params.messageRequest, 'propertyCategory': 's'}), params.isSubscribed))
          ? (message = 'Success')
          : (message = 'Failed')
        : (message = 'Failed');
    }
    return message;
  }

  async requestingReferral(agentParam: Object, isSubscribed: boolean): Promise<boolean> {
    const request = await this.referral.requestReferral(agentParam, isSubscribed);
    return request.userId === agentParam.userId;
  }

  async checkingReferral(agentParam: Object): Promise<boolean> {
    const check = await this.referral.checkReferral(agentParam);
    return _.isEmpty(check);
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
}

export default new ReferralRequestService(referralCore, listingCore);
