// @flow
import referralDao from '../dao/referrals';
import type { AgentReferral } from '../dao/referrals/type';
import { formatListingIdToObjectId } from './formatters/listingFormatter';

export class ReferralListerService {
  referral: Object;

  constructor(referral: Object) {
    this.referral = referral;
  }

  async getListerByReferralCode(
    referralCode: string,
    listingId: string
  ): Promise<AgentReferral> {
    const objListingId = formatListingIdToObjectId(listingId);
    const referral: AgentReferral = await this.referral.getReferralByCodeAndListingId(
      {
        referralCode: referralCode,
        ...objListingId,
      }
    );
    return referral;
  }
}

export default new ReferralListerService(referralDao);
