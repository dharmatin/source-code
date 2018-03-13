import * as web from 'express-decorators';
import _ from 'lodash';
import BaseController from './base';
import projectProfileService from '../services/projectProfileService';
import {
  handleNotFound,
  handleInternalServerError,
  handleSuccess,
} from '../libs/responseHandler';

@web.basePath('/v1/organisations')
class OrganisationController extends BaseController {
  @web.get('/:id/projects')
  async findAllProjectByOrganisationIdAction(req, res) {
    try {
      const excludeProjectId = !_.isNil(req.query.excludeProject)
        ? req.query.excludeProject
        : '';
      const translator = req.app.get('translator');

      const listings = await projectProfileService.getProjectByOrganisation(
        req.params.id,
        excludeProjectId,
        req.lang
      );
      if (_.isEmpty(listings)) {
        handleNotFound(res);
      }
      handleSuccess(res, listings);
    } catch (e) {
      handleInternalServerError(res);
      throw new Error(e);
    }
  }
}

export default new OrganisationController();
