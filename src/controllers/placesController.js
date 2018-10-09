import * as web from 'express-decorators';
import BaseController from './base';
import {
  handleInternalServerError,
  handleSuccess,
  handleNotFound,
} from '../libs/responseHandler';
import placesService from '../services/placesService';
import constants from '../config/constants';

const { NEWLAUNCH: { CHANNELS, EXPLORE_POPULAR_LOCATIONS_ALL } } = constants;

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

  @web.get('/places/popular')
  async getPopularPlaces(req, res) {
    const { query: { channel, level1 } } = req;
    try {
      if (channel === CHANNELS) {
        let response;
        if (level1 === EXPLORE_POPULAR_LOCATIONS_ALL) {
          response = await placesService.getExplorePopularLocationList({
            shouldHideCoverImage: true,
          });
        } else {
          response = await placesService.getPopularPlacesList();
        }
        handleSuccess(res, response);
      } else {
        handleNotFound(res);
      }
    } catch (err) {
      handleInternalServerError(res, err);
      throw new Error(err);
    }
  }
}

export default new PlacesController();
