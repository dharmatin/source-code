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

    return {message: message};
  }
}

export default new ReferralService(referralCore, listingCore);
