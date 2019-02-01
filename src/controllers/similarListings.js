import * as web from 'express-decorators';
import _ from 'lodash';
import BaseController from './base';
import similarListingService from '../services/similarListingService';
import {
  handleNotFound,
  handleInternalServerError,
  handleSuccess,
} from '../libs/responseHandler';

@web.basePath('/listing/v1/listings')
class SimilarListingController extends BaseController {
  @web.get('/similar/:id')
  async searchSimilarListingByIdAction(req, res, next) {
    try {
      const similarListings = await similarListingService.searchSimilarityById(
        req.params.id
      );
      if (!_.isEmpty(similarListings.items)) {
        handleSuccess(res, similarListings);
      } else {
        handleNotFound(res);
      }
    } catch (e) {
      console.log('ERROR', e);
      handleInternalServerError(res, e);
      throw new Error(e);
    }
  }

  @web.get('/similar/referral/:listingId')
  async searchSimilarListingReferralByIdAction(req, res, next) {
    try {
      const similarListings = await similarListingService.searchSimilarityReferralById(
        req.params.listingId
      );
      if (!_.isEmpty(similarListings.items)) {
        handleSuccess(res, similarListings);
      } else {
        handleNotFound(res);
      }
    } catch (e) {
      console.log('ERROR', e);
      handleInternalServerError(res, e);
      throw new Error(e);
    }
  }
}

export default new SimilarListingController();
