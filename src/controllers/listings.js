import * as web from 'express-decorators';
import BaseController from './base';
import projectProfileService from '../services/projectProfileService';
import _ from 'lodash';
import notFoundResponse from '../libs/response';

@web.basePath('/listings')
class ListingsController extends BaseController {
  @web.get('/:id')
  async findAllProjectProfilePageByIdAction(req, res) {
    try {
      const listings = await projectProfileService.getProjectProfile(req.params.id, this.lang);
      if (_.isEmpty(listings)) {
        return notFoundResponse(res);
      }
      res.send(listings);
    } catch (e) {
      res.status(500).send(e);
      throw new Error(e);
    }
  }
}

export default new ListingsController();
