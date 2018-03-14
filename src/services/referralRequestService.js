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

  async requestReferral(userId: string, listingId: string): Object {
    this._setFormatListingId(listingId);
    let message = 'Failed';
    const getListing = await this.listings.searchProject(listingId);
    if (getListing.response.numFound > 0) {
      await this.checkingReferral(userId) ?
        await this.requestingReferral(userId) ? message = 'Success' : message = 'Failed' :
        message = 'Failed';
    }
    return { message: message };
  }

  async requestingReferral(userId: string): Promise<boolean> {
    const request = await this.referral.requestReferral(userId, this._getFormatingListingId());
    return (request.userId === userId);
  }

  async checkingReferral(userId: string): Promise<boolean> {
    const check = await this.referral.checkReferral(userId, this._getFormatingListingId());
    return _.isEmpty(check);
  }

  _setFormatListingId(listingId: string) {
    const listingDetail = extractListingId(listingId);
    this.referralListingId = {
      adsProjectId: listingDetail.id,
      propertyType: listingDetail.type,
      propertyCategory: listingDetail.category
    };
  }

  _getFormatingListingId(): Object {
    return this.referralListingId;
  }

  async getReferralList(userInfo: Object): Object {
    const getUser = await this.listings.searchProjectByUserId(userInfo.userID);

    const projectId = [];
    _.map(getUser.response.docs, item => {
      const id = extractListingId(item.id);
      projectId.push(id.id);
    });
    const getReferral = await this.referral.getReferralByProjectId(projectId);
    console.log('di sini', getReferral[0].get());
    return getUser;
  }
}

export default new ReferralRequestService(referralCore, listingCore);
