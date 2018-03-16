// @flow
import _ from 'lodash';
import referralCore from '../dao/referrals';
import listingCore from '../dao/listings';
import { extractListingId } from '../libs/utility';
import config from '../config';

export class ReferralRequestService {
  referral: Object;
  listings: Object;
  referralListingId: Object;

  constructor(referral: Object, listings: Object) {
    this.referral = referral;
    this.listings = listings;
  }

  async requestReferral(userId: string, listingId: string): Object {
    this._setFormatListingId(listingId);
    let message = 'Failed';
    const getListing = await this.listings.searchProject(listingId);
    if (getListing.response.numFound > 0) {
      (await this.checkingReferral(userId))
        ? (await this.requestingReferral(userId))
          ? (message = 'Success')
          : (message = 'Failed')
        : (message = 'Failed');
    }
    return { message: message };
  }

  async requestingReferral(userId: string): Promise<boolean> {
    const request = await this.referral.requestReferral(
      userId,
      this._getFormatingListingId()
    );
    return request.userId === userId;
  }

  async checkingReferral(userId: string): Promise<boolean> {
    const check = await this.referral.checkReferral(
      userId,
      this._getFormatingListingId()
    );
    return _.isEmpty(check);
  }

  async getLatestRefferal(listerId: number, listingId: string): Object {
    const result = await this.referral.getLatestReferralRequest({
      userId: listerId,
      adsProjectId: extractListingId(listingId).id
    });
    console.log(result);
    return result;
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
