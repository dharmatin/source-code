import * as web from 'express-decorators';
import BaseController from './base';
import projectProfileService from '../services/projectProfileService';
import _ from 'lodash';
import {notFoundResponse, internalServerErrorResponse, successResponse} from '../libs/response';

@web.basePath('/listings')
class ListingsController extends BaseController {
  @web.get('/:id')
  async findAllProjectProfilePageByIdAction(req, res) {
    try {
      const listings = await projectProfileService.getProjectProfile(req.params.id, this.lang);
      if (_.isEmpty(listings)) {
        notFoundResponse(res);
      }
      successResponse(res, listings);
    } catch (e) {
      internalServerErrorResponse(res, e);
      throw new Error(e);
    }
  }
}

export default new ListingsController();
