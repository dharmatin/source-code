import MysqlClient from '../../libs/connections/MysqlClient';
import Referral from '../../models/referral';
const DATABASE_NAME = 'default';
const { client: ReferralClient } = new MysqlClient(DATABASE_NAME);
const { model: ReferralModel } = new Referral(ReferralClient);

export default {
  insertReferral: async(values) => {
    const referral = await ReferralModel;
    return referral.create(values);
  },
  getRefferral: async(condition) => {
    const referral = await ReferralModel.findOne({
      where: condition
    });
    return referral.get();
  }
};
