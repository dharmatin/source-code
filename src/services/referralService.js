// @flow
import _ from 'lodash';
import referralCore from '../dao/referrals';
import listingCore from '../dao/listings';
import listerCore from '../dao/listers';
import { extractListingId } from '../libs/utility';
import { formatAttributesReferral } from './formatters/referralFormater';
import { handleNotFound } from '../libs/responseHandler';

export class ReferralService {
  referral: Object;
  listings: Object;
  listers: Object;

  constructor(referral: Object, listings: Object, listers: Object) {
    this.referral = referral;
    this.listings = listings;
    this.listers = listers;
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

  async getReferralList(req: Object): Object {
    const getProject = await this.listings.searchProjectByUserId(req.userInfo.userID);
    if (getProject.response.numFound < 1) {
      throw new Error('Solr Project Not Found');
    }
    const projectId = [];
    _.map(getProject.response.docs, item => {
      const id = extractListingId(item.id);
      projectId.push(id.id);
    });

    const start = (req.query.pageToken - 1) * req.query.pageSize;

    const getReferral = await this.referral.getReferralByProjectId(projectId, start, req.query.pageSize);

    return formatAttributesReferral(getReferral, req);
  }
}

export default new ReferralService(referralCore, listingCore, listerCore);
