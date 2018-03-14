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

  async getReferralList(userInfo: Object): Object {
    const getUser = await this.listings.searchProjectByUserId(userInfo.userID);
    const projectId = [];
    _.map(getUser.response.docs, item => {
      const id = item.id;
      projectId.push(id);
    });
    // const getReferral = await this.referral.getReferralByProjectId(projectId);

    return getUser;
  }
}

export default new ReferralService(referralCore, listingCore);
