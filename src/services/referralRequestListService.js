// @flow
import _ from 'lodash';
import referralCore from '../dao/referrals';
import listingCore from '../dao/listings';
import { formatAttributesReferral } from './formatters/referralRequestListFormater';

export class ReferralRequestListService {
  referral: Object;
  listings: Object;
  listers: Object;

  constructor(referral: Object, listings: Object) {
    this.referral = referral;
    this.listings = listings;
  }

  async getReferralList(req: Object): Object {
    const project = await this.listings.searchProjectByUserId(req.userId, 0, 1);
    if (project.responseHeader.status !== 0) {
      throw new Error('Solr Project Not Found');
    }

    const rowStart = (req.pagingRequest.pageToken - 1) * req.pagingRequest.pageSize;
    const pagingRequest = {
      pageToken: Number(req.pagingRequest.pageToken),
      pageSize: Number(req.pagingRequest.pageSize),
    };
    let referralQuery = [];
    const referralWithoutLimitQuery = await this.referral.getCountReferralByProjectId(
      project.response.docs[0].developer_company_id
    );
    if (referralWithoutLimitQuery[0].total > 0) {
      referralQuery = await this.referral.getReferralByProjectId(
        project.response.docs[0].developer_company_id,
        rowStart,
        req.pagingRequest.pageSize
      );
    }

    return formatAttributesReferral(
      referralQuery,
      referralWithoutLimitQuery[0].total,
      pagingRequest
    );
  }
}

export default new ReferralRequestListService(referralCore, listingCore);
