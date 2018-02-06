import * as web from 'express-decorators'
import BaseController from './base'
import listingService from '../services/listingService'


@web.basePath('/listings')
class ListingsController extends BaseController {
  // constructor() {
  //   super()
  // }
  
  @web.get('/')
  async findAllProjects(req, res, next) {
    console.log('tes');
    res.send("tes");
  }

  @web.get('/:id')
  async findAllProjectByIdAction(req, res, next) {
    const listings = await listingService.getListings(req.params.id);
    console.log(listings);
    res.send(listings);

    //console.log(req.query.page);
    //console.log(req.params.id);
    //res.send(req.params.id);
  }

  @web.get('/:unitId')
  async findAllSubUnitByIdAction(req, res, next) {
    
  }
}

export default new ListingsController()
