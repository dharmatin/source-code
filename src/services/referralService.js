import referralCore from '../dao/referrals';

export class ReferralService {
  constructor(referral) {
    this.referral = referral;
  }
  async requestReferral(values) {
    return this.referral.insertReferral(values);
  }
}

export default new ReferralService(referralCore);
