import * as web from 'express-decorators';
import BaseController from './base';
import {
  handleInternalServerError,
  handleSuccess,
} from '../libs/responseHandler';
import placesService from '../services/placesService';

@web.basePath('/place/v1')
class PlacesController extends BaseController {
  @web.get('/places/featured')
  async getExplorePopularLocation(req, res) {
    try {
      const response = await placesService.getExplorePopularLocationList();
      handleSuccess(res, response);
    } catch (err) {
      handleInternalServerError(res, err);
      throw new Error(err);
    }
  }
}

export default new PlacesController();
