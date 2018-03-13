import * as web from 'express-decorators';
import _ from 'lodash';
import BaseController from './base';
import referralService from '../services/referralService';

import {
  handleInternalServerError,
  handleSuccess,
  handleUnauthorized,
  handleNotFound
} from '../libs/responseHandler';

@web.basePath('/v1/referrals/listings')
class ReferralsController extends BaseController {
  @web.use()
  async handleUserInfo(req, res, next) {
    if (_.isEmpty(req.userInfo)) {
      handleUnauthorized(res);
    } else {
      next();
    }
  }

  @web.post('/:listingId/apply')
  async requestReferral(req, res) {
    try {
      handleSuccess(
        res,
        await referralService.requestReferral(
          req.userInfo.userID,
          req.params.listingId
        )
      );
    } catch (e) {
      handleInternalServerError(res, e);
      throw new Error(e);
    }
  }

  @web.get('/:listingId')
  async requestReferralList(req, res) {
    try {
      const referralList = await referralService.getReferralList(req.params.listingId);

      if (_.isEmpty(referralList)) {
        handleNotFound(res);
      }
      handleSuccess(res, referralList);
    } catch (e) {
      handleInternalServerError(res, e);
      throw new Error(e);
    }
  }
}

export default new ReferralsController();
