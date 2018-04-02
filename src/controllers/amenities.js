import * as web from 'express-decorators';
import _ from 'lodash';
import BaseController from './base';
import projectProfileService from '../services/projectProfileService';
import {
  handleNotFound,
  handleInternalServerError,
  handleSuccess,
} from '../libs/responseHandler';

@web.basePath('/v1/amenities')
class AmenitiesController extends BaseController {
  @web.get('/:id')
  async getAllAmenitiesByIdAction(req, res, next) {
    try {
      const amenities = await projectProfileService.getAmenitiesById(
        req.params.id
      );
      if (_.isEmpty(amenities)) {
        handleNotFound(res);
      } else {
        handleSuccess(res, amenities);
      }
    } catch (e) {
      handleInternalServerError(res, e);
      throw new Error(e);
    }
  }
}

export default new AmenitiesController();
