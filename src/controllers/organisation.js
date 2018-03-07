import * as web from 'express-decorators';
import _ from 'lodash';
import BaseController from './base';
import projectProfileService from '../services/projectProfileService';
import {handlerNotFound, handlerInternalServerError, handlerSuccess} from '../libs/responseHandler';

@web.basePath('/organisation/v1/organisations')
class OrganisationController extends BaseController {

  @web.get('/:id/projects')
  async findAllProjectByOrganisationIdAction(req, res) {
    try {
      const excludeProjectId = !_.isNil(req.query.excludeProject) ? req.query.excludeProject : '';
      const listings = await projectProfileService.searchProjectByOrganisation(req.params.id, excludeProjectId, this.lang);
      if (_.isEmpty(listings)) {
        handlerNotFound(res);
      }
      handlerSuccess(res, listings);
    } catch (e) {
      handlerInternalServerError(res);
      throw new Error(e);
    }
  }
}

export default new OrganisationController();
