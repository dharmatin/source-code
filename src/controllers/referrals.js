import * as web from 'express-decorators';
import _ from 'lodash';
import BaseController from './base';
import referralService from '../services/referralService';

import {
  handlerInternalServerError,
  handlerSuccess,
  handlerUnauthorized,
} from '../libs/responseHandler';

@web.basePath('/v1/referrals/listings')
class ReferralsController extends BaseController {
  @web.use()
  async handlerUserInfo(req, res, next) {
    if (_.isEmpty(req.userInfo)) {
      handlerUnauthorized(res);
    } else {
      next();
    }
  }

  @web.post('/:listingId/apply')
  async requestReferral(req, res) {
    try {
      handlerSuccess(res, await referralService.requestReferral(req.userInfo.userID, req.params.listingId));
    } catch (e) {
      handlerInternalServerError(res, e);
      throw new Error(e);
    }
  }
}

export default new ReferralsController();
