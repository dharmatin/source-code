import * as web from 'express-decorators';
import BaseController from './base';
import _ from 'lodash';
import articlesService from '../services/articlesService';
import {
  handleNotFound,
  handleInternalServerError,
  handleSuccess,
} from '../libs/responseHandler';
import { getRequestForPagingParam } from '../libs/utility';

@web.basePath('/v1/articles')
class ArticlesController extends BaseController {
  @web.get('/categories/primary-pdp')
  async findArticlesReferalProjectAction(req, res, next) {
    try {
      const DEFAULT_PAGE_SIZE = 4;
      const pagingRequest = getRequestForPagingParam(req, DEFAULT_PAGE_SIZE);

      const articles = await articlesService.getArticlesByTags(
        req.query.projectId,
        pagingRequest
      );

      if (_.isEmpty(articles)) {
        handleNotFound(res);
      } else {
        handleSuccess(res, articles);
      }
    } catch (e) {
      handleInternalServerError(res, e);
      throw new Error(e);
    }
  }
}

export default new ArticlesController();
