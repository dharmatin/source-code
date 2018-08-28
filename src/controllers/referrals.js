import * as web from 'express-decorators';
import _ from 'lodash';
import BaseController from './base';
import referralRequestService from '../services/referralRequestService';
import referralApprovalService from '../services/referralApprovalService';
import referralRequestListService from '../services/referralRequestListService';
import referralRejectionService from '../services/referralRejectionService';
import referralRemovalService from '../services/referralRemovalService';
import { isValidCustomer, isValidDeveloper } from '../middleware/userGroup';
import config from '../config';
import { getRequestForPagingParam } from '../libs/utility';

import {
  handleInternalServerError,
  handleSuccess,
  handleNotFound,
  handleResponseMessage,
  handleBadRequest,
} from '../libs/responseHandler';

@web.basePath('/v1/referrals/listings')
class ReferralsController extends BaseController {
  @web.post('/:listingId/apply', [isValidCustomer])
  async requestReferral(req, res) {
    try {
      const result = await referralRequestService.requestReferral({
        listingId: req.params.listingId,
        listerId: req.userInfo.userID,
        messageRequest: req.body.message,
        isSubscribed: Number(req.body.isSubscribed),
      });
      if (result === config.RESPONSE_TXT.SUCCESS) {
        handleResponseMessage(res, config.RESPONSE_TXT.SUCCESS);
      } else {
        handleBadRequest(res);
      }
    } catch (e) {
      handleInternalServerError(res, e);
      throw new Error(e);
    }
  }

  @web.get('/listers', [isValidDeveloper])
  async listReferral(req, res, next) {
    try {
      const DEFAULT_PAGE_SIZE = 4;
      const pagingRequest = getRequestForPagingParam(req, DEFAULT_PAGE_SIZE);
      const requestParameter = {
        developerCompanyId: req.userInfo.developerCompanyId,
        pagingRequest,
      };
      const referralList = await referralRequestListService.getReferralList(
        requestParameter
      );

      if (_.isEmpty(referralList)) {
        handleNotFound(res);
      } else {
        handleSuccess(res, referralList[0]);
      }
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
        handleResponseMessage(res, config.RESPONSE_TXT.SUCCESS);
      } else {
        handleBadRequest(res);
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
        handleResponseMessage(res, config.RESPONSE_TXT.SUCCESS);
      } else {
        handleBadRequest(res);
      }
    } catch (e) {
      handleInternalServerError(res);
      throw new Error(e);
    }
  }

  @web.del('/:listingId/listers/:listerId', [isValidDeveloper])
  async removeReferral(req, res) {
    try {
      const result = await referralRemovalService.removeListerFromReferral({
        listerId: req.params.listerId,
        listingId: req.params.listingId,
        referralReason: req.body.reason,
      });
      if (result) {
        handleResponseMessage(res, config.RESPONSE_TXT.SUCCESS);
      } else {
        handleBadRequest(res);
      }
    } catch (e) {
      handleInternalServerError(res);
      throw new Error(e);
    }
  }

  @web.get('/:listingId/status', [isValidCustomer])
  async statusReferral(req, res) {
    try {
      const result = await referralRequestService.getLatestRefferal(
        req.userInfo.userID,
        req.params.listingId
      );
      if (!_.isEmpty(result)) {
        handleSuccess(res, result);
      } else {
        handleNotFound(res);
      }
    } catch (e) {
      handleInternalServerError(res);
      throw new Error(e);
    }
  }
}

export default new ReferralsController();
