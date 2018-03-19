// @flow
import _ from 'lodash';
import referralCore from '../dao/referrals';
import listingCore from '../dao/listings';
import { extractListingId } from '../libs/utility';
import { formatStatusReferral } from './formatters/referralFormatter';

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
      if (await this.checkingReferral(agentParam)) {
        if (await this.requestingReferral(_.assign(agentParam, {messageRequest: params.messageRequest, 'propertyCategory': 's'}), params.isSubscribed)) {
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
    if ( listing.response.numFound > 0 && listing.response.docs[0].is_referral === 1) {
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
}

export default new ReferralRequestService(referralCore, listingCore);
