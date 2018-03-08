import * as web from 'express-decorators';
import BaseController from './base';
import projectProfileService from '../services/projectProfileService';
import _ from 'lodash';
import {handlerNotFound, handlerInternalServerError, handlerSuccess} from '../libs/responseHandler';

@web.basePath('/listing/v1/listings')
class ListingsController extends BaseController {

  @web.get('/:id')
  async findAllProjectProfilePageByIdAction(req, res, next) {
    try {
      const listings = await projectProfileService.getProjectProfile(req.params.id, req.lang);
      if (_.isEmpty(listings)) {
        handlerNotFound(res);
      }
      handlerSuccess(res, listings);
    } catch (e) {
      handlerInternalServerError(res, e);
      throw new Error(e);
    }
  }
}

export default new ListingsController();
