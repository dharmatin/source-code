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
    const project = await this.listings.searchProjectByUserId(req.userInfo.userID, 0, 1);
    if (project.responseHeader.status !== 0) {
      throw new Error('Solr Project Not Found');
    }

    const rowStart = (req.query.pageToken - 1) * req.query.pageSize;
    const pagingRequest = {pageToken: req.query.pageToken, pageSize: req.query.pageSize};

    const referralQuery = await this.referral.getReferralByProjectId(project.response.docs[0].developer_company_id, rowStart, req.query.pageSize);
    const referralWithoutLimitQuery = await this.referral.getCountReferralByProjectId(project.response.docs[0].developer_company_id);

    return formatAttributesReferral(referralQuery, req, referralWithoutLimitQuery[0].total, pagingRequest);
  }
}

export default new ReferralService(referralCore, listingCore);
