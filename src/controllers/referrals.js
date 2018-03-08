import * as web from 'express-decorators';
import BaseController from './base';
import referralService from '../services/referralService';
import projectProfileService from '../services/projectProfileService';

import {handlerNotFound, handlerInternalServerError, handlerSuccess} from '../libs/responseHandler';

@web.basePath('/referral/v1/referrals')
class ReferralsController extends BaseController {
  @web.post('/:listingId/apply')
  async requestReferral(req, res) {
    try {
      const listing = await projectProfileService.getProjectProfile(req.params.listingId, this.lang);
      const referral =  await referralService.requestReferral({
        developerId: listing.organisations[0].id,
        adsProjectId: listing.id.substring(3),
        userId: '123123'
      });

      handlerSuccess(res, referral);
    } catch (e) {
      handlerInternalServerError(res, e);
      throw new Error(e);
    }
  }
}

export default new ReferralsController();