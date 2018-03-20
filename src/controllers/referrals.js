import * as web from 'express-decorators';
import _ from 'lodash';
import BaseController from './base';
import referralRequestService from '../services/referralRequestService';
import referralApprovalService from '../services/referralApprovalService';
import referralRequestListService from '../services/referralRequestListService';
import referralRejectionService from '../services/referralRejectionService';
import { isValidCustomer, isValidDeveloper } from '../middleware/userGroup';

import {
  handleInternalServerError,
  handleSuccess,
  handleNotFound,
  handleResponseMessage
} from '../libs/responseHandler';

@web.basePath('/v1/referrals/listings')
class ReferralsController extends BaseController {
  @web.post('/:listingId/apply', [isValidCustomer])
  async requestReferral(req, res) {
    try {
      const result = await referralRequestService.requestReferral({
        listingId: req.params.listingId,
        listerId: req.userInfo.userID,
        messageRequest: req.body.Message,
        isSubscribed: Number(req.body.isSubscribed)
      });
      handleResponseMessage(res, result);
    } catch (e) {
      handleInternalServerError(res, e);
      throw new Error(e);
    }
  }

  @web.get('/listers', [isValidDeveloper])
  async listReferral(req, res, next) {
    try {
      const referralList = await referralRequestListService.getReferralList(req);

      if (_.isEmpty(referralList)) {
        handleNotFound(res);
      }
      handleSuccess(res, referralList[0]);
    } catch (e) {
      handleInternalServerError(res, e);
    }
  }

  @web.post('/:listingId/listers/:listerId', [isValidDeveloper])
  async approveReferral(req, res) {
    try {
      const result = await referralApprovalService.requestApprove(
        req.params.listerId,
        req.params.listingId
      );
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

  @web.put('/:listingId/listers/:listerId/deny', [isValidDeveloper])
  async rejectReferral(req, res) {
    try {
      const result = await referralRejectionService.rejectReferral({
        listerId: req.params.listerId,
        listingId: req.params.listingId,
        referralReason: req.body.reason,
      });
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

  @web.get('/:listingId/status', [isValidCustomer])
  async statusReferral(req, res) {
    try {
      const result = await referralRequestService.getLatestRefferal(req.userInfo.userID, req.params.listingId);
      handleSuccess(res, result);
    } catch (e) {
      handleInternalServerError(res);
      throw new Error(e);
    }
  }
}

export default new ReferralsController();
