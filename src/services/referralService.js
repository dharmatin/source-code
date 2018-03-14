// @flow
import _ from 'lodash';
import referralCore from '../dao/referrals';
import listingCore from '../dao/listings';

export class ReferralService {
  referral: Object;
  listings: Object;

  constructor(referral: Object, listings: Object) {
    this.referral = referral;
    this.listings = listings;
  }

  async requestReferral(userId: string, listingId: string): Object {
    let message = 'Failed';
    const getListing = await this.listings.searchProject(listingId);
    if (getListing.response.numFound > 0) {
      const checking = await this.referral.checkReferral(userId, listingId);
      if (_.isNull(checking)) {
        const result = await this.referral.requestReferral(userId, listingId);
        if (result.userId === userId) message = 'Success';
      }
    }

    return { message: message };
  }

  async getReferralList(userInfo: Object, listingId: string): Object {
    const getUser = await this.referral.searchUser(userInfo.userInfo);
    // const getListing = await this.listings.searchProject(listingId);
    // const status = getListing.responseHeader.status;
    // if (status !== 0) {
    //   throw new Error('Solr search error!');
    // }
    // return getListing;
  }
}

export default new ReferralService(referralCore, listingCore);
