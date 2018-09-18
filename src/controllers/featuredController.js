import * as web from 'express-decorators';
import _ from 'lodash';
import BaseController from './base';
import {
  handleInternalServerError,
  handleNotFound,
  handleSuccess,
} from '../libs/responseHandler';
import featuredVideoService from '../services/featuredVideoService';

@web.basePath('/featured/v1')
class FeaturedController extends BaseController {
  @web.get('/videos')
  async getFeaturedVideo(req, res, next) {
    const { channel } = req.query;

    try {
      const videos = await featuredVideoService.getVideosList(channel);
      return !_.isEmpty(videos) ?
        handleSuccess(res, videos) :
        handleNotFound(res);
    } catch (err) {
      handleInternalServerError(res, err);
      throw new Error(err);
    }
  }
}

export default new FeaturedController();
