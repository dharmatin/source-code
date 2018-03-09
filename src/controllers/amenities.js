import * as web from 'express-decorators';
import _ from 'lodash';
import BaseController from './base';
import projectProfileService from '../services/projectProfileService';
import {handlerNotFound, handlerInternalServerError, handlerSuccess} from '../libs/responseHandler';

@web.basePath('/amenities/v1')
class AmenitiesController extends BaseController {

  @web.get('/:id')
  async getAllAmenitiesByIdAction(req, res, next) {
    try {
      const amenities = await projectProfileService.getAmenitiesById(req.params.id, this.lang);
      if (_.isEmpty(amenities)) {
        handlerNotFound(res);
      }
      handlerSuccess(res, amenities);
    } catch (e) {
      handlerInternalServerError(res, e);
      throw new Error(e);
    }
  }
}

export default new AmenitiesController();
