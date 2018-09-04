import * as web from 'express-decorators';
import BaseController from './base';
import {
  handleInternalServerError,
  handleNotFound,
  handleSuccess,
} from '../libs/responseHandler';
import constants from '../config/constants';
import searchService from '../services/searchListingService';
import _ from 'lodash';

@web.basePath('/search/v1')
class SearchController extends BaseController {
  @web.post('/search')
  async getSearchListing(req, res) {
    const { body, query: { pageSize, nextPageToken } } = req;
    try {
      if (_.includes(body.channels, constants.NEWLAUNCH.CHANNELS)) {
        const search = await searchService.getListingList(body, {
          pageSize: pageSize || constants.DEFAULT_QUERY.SEARCH_PAGE_SIZE,
          nextPageToken: nextPageToken || constants.DEFAULT_QUERY.PAGE_TOKEN,
        });
        handleSuccess(res, search);
      }
      handleNotFound(res);
    } catch (err) {
      handleInternalServerError(res, err);
      throw new Error(err);
    }
  }
}

export default new SearchController();
