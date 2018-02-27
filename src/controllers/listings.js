import * as web from 'express-decorators';
import BaseController from './base';
import listingService from '../services/listingService';
import {} from '../libs/response';
import validateInput from '../middleware/validation';

@web.basePath('/listings')
class ListingsController extends BaseController {

  @web.get('/')
  async findAllProjects(req, res, next) {
    console.log('tes');
    res.send('tes');
  }

  @web.get('/:id')
  async findAllProjectByIdAction(req, res) {
    try {
      const listings = await listingService.getListingForPPP(req.params.id, this.lang);
      res.send(listings);
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
      throw new Error(e);
    }
    // console.log(req.query.page);
    // console.log(req.params.id);
    // res.send(req.params.id);
  }

  @web.get('/:unitId')
  async findAllSubUnitByIdAction(req, res, next) {

  }
}

export default new ListingsController();
