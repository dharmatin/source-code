import * as web from 'express-decorators';
import BaseController from './base';
import ReferralService from '../services/referralService';

import {handlerNotFound, handlerInternalServerError, handlerSuccess} from '../libs/responseHandler';

@web.basePath('/referral/v1/referrals')
class ReferralsController extends BaseController {
  @web.post('/:listing_id/apply')
  async requestReferral(req, res) {
    try {
      const listingID = req.params.listing_id;
      handlerSuccess(res, await ReferralService.requestReferral({
        userId: req.userInfo.user_id,
        adsProjectId: listingID.substring(3),
        propertyType: listingID.substring(0, 2),
        propertyCategory: listingID.substring(2, 3),
        referralStatus: -1
      }));
    } catch (e) {
      handlerInternalServerError(res, e);
      throw new Error(e);
    }
  }
}

export default new ReferralsController();
