import * as web from 'express-decorators';
import _ from 'lodash';
import BaseController from './base';
import referralService from '../services/referralService';
import referralApprovalService from '../services/referralApprovalService';

import {
  handleInternalServerError,
  handleSuccess,
  handleUnauthorized,
  handleResponseMessage
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

  @web.post('/:listingId/listers/:listerId')
  async approveReferral(req, res) {
    try {
      const result = await referralApprovalService.requestApprove(req.params.listerId, req.params.listingId);
      if (result) {
        handleResponseMessage(res, 'success');
      } else {
        handleResponseMessage(res, 'failed');
      }
    } catch (e) {
      handleInternalServerError(res);
      throw new Error(e);
    }
  }
}

export default new ReferralsController();
