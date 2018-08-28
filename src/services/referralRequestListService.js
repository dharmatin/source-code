// @flow
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
    const rowStart =
      (req.pagingRequest.pageToken - 1) * req.pagingRequest.pageSize;
    const pagingRequest = {
      pageToken: Number(req.pagingRequest.pageToken),
      pageSize: Number(req.pagingRequest.pageSize),
    };
    let referralQuery = [];
    const referralWithoutLimitQuery = await this.referral.getCountReferralByProjectId(
      req.developerCompanyId
    );
    if (referralWithoutLimitQuery[0].total > 0) {
      referralQuery = await this.referral.getReferralByProjectId(
        req.developerCompanyId,
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
