import * as web from 'express-decorators';
import _ from 'lodash';
import BaseController from './base';
import projectProfileService from '../services/projectProfileService';
import {
  handleInternalServerError,
  handleSuccess,
  handleNotFound,
} from '../libs/responseHandler';
import { getRequestForPagingParam } from '../libs/utility';

@web.basePath('/v1/organisations')
class OrganisationController extends BaseController {
  @web.get('/:id')
  async findAllOrganisationByIdAction(req, res) {
    try {
      const organisation = await projectProfileService.getOrganisationById(
        req.params.id
      );

      if (_.isEmpty(organisation)) {
        handleNotFound(res);
      } else {
        handleSuccess(res, organisation);
      }
    } catch (e) {
      handleInternalServerError(res);
      throw new Error(e);
    }
  }

  @web.get('/:id/projects')
  async findAllProjectByOrganisationIdAction(req, res) {
    try {
      const excludeProjectId = !_.isNil(req.query.excludeProject) ?
        req.query.excludeProject :
        '';
      const DEFAULT_PAGE_SIZE = 20;
      const pagingRequest = getRequestForPagingParam(req, DEFAULT_PAGE_SIZE);

      const listings = await projectProfileService.getProjectByOrganisation(
        req.params.id,
        excludeProjectId,
        pagingRequest
      );

      handleSuccess(res, listings);
    } catch (e) {
      handleInternalServerError(res);
      throw new Error(e);
    }
  }
}

export default new OrganisationController();
