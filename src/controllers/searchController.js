import * as web from 'express-decorators';
import BaseController from './base';
import {
  handleInternalServerError,
  handleSuccess,
} from '../libs/responseHandler';
import constants from '../config/constants';
import searchService from '../services/searchListingService';

@web.basePath('/search/v1')
class SearchController extends BaseController {
  @web.post('/search')
  async getSearchListing(req, res) {
    const { body, query: { pageSize, nextPageToken } } = req;
    try {
      const search = await searchService.getListingList(body, {
        pageSize: pageSize || constants.DEFAULT_QUERY.SEARCH_PAGE_SIZE,
        nextPageToken: nextPageToken || constants.DEFAULT_QUERY.PAGE_TOKEN,
      });
      handleSuccess(res, search);
    } catch (err) {
      handleInternalServerError(res, err);
      throw new Error(err);
    }
  }
}

export default new SearchController();
