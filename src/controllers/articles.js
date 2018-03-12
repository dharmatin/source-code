import * as web from 'express-decorators';
import BaseController from './base';
import _ from 'lodash';
import articlesService from '../services/articlesService';
import projectProfileService from '../services/projectProfileService';
import {handlerNotFound, handlerInternalServerError, handlerSuccess} from '../libs/responseHandler';

@web.basePath('/v1/articles')

class ArticlesController extends BaseController {
  @web.get('/:category')
  async findArticlesReferalProjectAction(req, res, next) {
    let queryString = req.query;
    try {
      const listings = await projectProfileService.getOneProjectByid(queryString.projectId, req.lang);

      if (_.isEmpty(listings)) {
        handlerNotFound(res);
      }

      let params = {
        category: req.params.category,
        projectName: listings.listings[0].project_name,
        developerName: listings.listings[0].developer_name,
        start: queryString.pageToken,
        rows: queryString.pageSize
      };

      const articles = await articlesService.getArticlesByCategory(params, req.lang);

      if (_.isEmpty(articles)) {
        handlerNotFound(res);
      }

      handlerSuccess(res, articles);
    } catch (e) {
      handlerInternalServerError(res, e);
      throw new Error(e);
    }
  }
}

export default new ArticlesController();
