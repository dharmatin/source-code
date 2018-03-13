import * as web from 'express-decorators';
import BaseController from './base';
import _ from 'lodash';
import articlesService from '../services/articlesService';
import { handleNotFound, handleInternalServerError, handleSuccess } from '../libs/responseHandler';

@web.basePath('/v1/articles')

class ArticlesController extends BaseController {
  @web.get('/:category')
  async findArticlesReferalProjectAction(req, res, next) {
    let queryString = req.query;

    try {
      if (req.params.category !== 'primary-pdp') {
        handleNotFound(res);
      }

      const params = {
        page: Number(queryString.pageToken) || 1,
        limit: Number(queryString.pageSize) || 4,
        projectId: queryString.projectId
      }

      const articles = await articlesService.getArticlesByTags(params);

      if (_.isEmpty(articles)) {
        handleNotFound(res);
      }

      handleSuccess(res, articles);
    } catch (e) {
      handleInternalServerError(res, e);
      throw new Error(e);
    }
  }
}

export default new ArticlesController();
