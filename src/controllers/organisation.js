import * as web from 'express-decorators';
import BaseController from './base';
import projectProfileService from '../services/projectProfileService';
import _ from 'lodash';
import {notFoundResponse, internalServerErrorResponse, successResponse} from '../libs/responseHandler';

@web.basePath('/organisation/v1/organisations')
class OrganisationController extends BaseController {
  @web.get('/:organisationId/projects')
  async findAllProjectByOrganisationIdAction(req, res) {
    try {
      const listings = await projectProfileService.searchProjectByOrganisation(req.params.organisationId, this.lang);
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

export default new OrganisationController();
