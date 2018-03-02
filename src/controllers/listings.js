import * as web from 'express-decorators';
import BaseController from './base';
import listingService from '../services/listingService';
import {} from '../libs/response';

@web.basePath('/listings')
class ListingsController extends BaseController {

  @web.get('/')
  async findAllProjects(req, res, next) {

  }

  @web.get('/:id')
  async findAllProjectProfilePageByIdAction(req, res) {
    try {
      const listings = await listingService.getListingForPPP(req.params.id, this.lang);
      res.send(listings);
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
      throw new Error(e);
    }
  }

  @web.get('/:unitId')
  async findAllSubUnitByIdAction(req, res, next) {

  }
}

export default new ListingsController();
