// @flow
import _ from 'lodash';
import referralCore from '../dao/referrals';
import listingCore from '../dao/listings';
import { extractListingId } from '../libs/utility';
import { formatAttributesReferral } from './formatters/referralRequestListFormater';

export class ReferralService {
  referral: Object;
  listings: Object;
  listers: Object;

  constructor(referral: Object, listings: Object) {
    this.referral = referral;
    this.listings = listings;
  }

  async getReferralList(req: Object): Object {
    const getProject = await this.listings.searchProjectByUserId(req.userInfo.userID);
    if (getProject.responseHeader.status !== 0) {
      throw new Error('Solr Project Not Found');
    }
    const projectId = [];
    _.map(getProject.response.docs, item => {
      const id = extractListingId(item.id);
      projectId.push(id.id);
    });

    const setRowStart = (req.query.pageToken - 1) * req.query.pageSize;

    const referralQuery = await this.referral.getReferralByProjectId(projectId, setRowStart, req.query.pageSize, true);
    const referralWithoutLimitQuery = await this.referral.getReferralByProjectId(projectId, setRowStart, req.query.pageSize, false);
    // return [referralQuery];
    return formatAttributesReferral(referralQuery, req, referralWithoutLimitQuery.length);
  }
}

export default new ReferralService(referralCore, listingCore);
