import * as web from 'express-decorators';
import BaseController from './base';
import projectProfileService from '../services/projectProfileService';
import {
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

      handleSuccess(res, amenities);
    } catch (e) {
      handleInternalServerError(res, e);
      throw new Error(e);
    }
  }
}

export default new AmenitiesController();
