import * as web from 'express-decorators';
import BaseController from './base';
import _ from 'lodash';
import articlesService from '../services/articlesService';
import {handlerNotFound, handlerInternalServerError, handlerSuccess} from '../libs/responseHandler';

@web.basePath('/v1/articles')

class ArticlesController extends BaseController {
  @web.get('/:category')
  async findArticlesReferalProjectAction(req, res, next) {
    let queryString = req.query;

    try {
      if (req.params.category !== 'primary-pdp') {
        handlerNotFound(res);
      }

      const articles = await articlesService.getArticlesByTags(queryString);

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
