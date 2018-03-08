import * as web from 'express-decorators';
import BaseController from './base';
import ReferralService from '../services/referralService';
import projectProfileService from '../services/projectProfileService';

import {handlerNotFound, handlerInternalServerError, handlerSuccess} from '../libs/responseHandler';

@web.basePath('/referral/v1/referrals')
class ReferralsController extends BaseController {
  @web.post('/:listing_id/apply')
  async requestReferral(req, res) {
    try {
      const listings = await projectProfileService.getProjectProfile(req.params.listing_id, this.lang);
      handlerSuccess(res, await ReferralService.requestReferral({
        developerId: listings.organisations[0].id,
        adsProjectId: listings.id.substring(3),
        userId: '123123'
      }));
    } catch (e) {
      handlerInternalServerError(res, e);
      throw new Error(e);
    }
  }
}

export default new ReferralsController();
