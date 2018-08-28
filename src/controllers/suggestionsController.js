import * as web from 'express-decorators';
import BaseController from './base';
import {
  handleInternalServerError,
  handleNotFound,
  handleSuccess,
} from '../libs/responseHandler';
import suggestionsService from '../services/suggestionsService';
import constant from '../config/constants';

@web.basePath('/suggestion/v1')
class SuggestionController extends BaseController {
  @web.get('/suggestions')
  async getSearchSuggestion(req, res, next) {
    const { query, limit } = req.query;

    try {
      const suggestions = await suggestionsService.getSuggestionsList(
        query,
        limit || constant.DEFAULT_QUERY.LIMIT_SUGGESTION,
      );
      return suggestions.totalCount > 0 ?
        handleSuccess(res, suggestions) :
        handleNotFound(res);
    } catch (err) {
      handleInternalServerError(res, err);
      throw new Error(err);
    }
  }
}

export default new SuggestionController();
