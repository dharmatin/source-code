import * as web from 'express-decorators';
import BaseController from './base';
import projectProfileService from '../services/projectProfileService';
import _ from 'lodash';
import config from '../config';

import {
  handleNotFound,
  handleInternalServerError,
  handleSuccess,
} from '../libs/responseHandler';

@web.basePath('/listing/v1/listings')
class ListingsController extends BaseController {
  @web.get('/:id')
  async findAllProjectProfilePageByIdAction(req, res, next) {
    try {
      let listerId = 0;
      let referralCode = '';
      if (!_.isNil(req.userInfo) && parseInt(req.userInfo.userGroup) === config.USER_GROUP.CUSTOMER) {
        listerId = req.userInfo.userID;
      }

      if (!_.isNil(req.query.referralCode) && !_.isEmpty(req.query.referralCode)) {
        referralCode = req.query.referralCode;
      }

      const listings = await projectProfileService.getProjectProfile({
        id: req.params.id,
        listerId: listerId,
        referralCode: referralCode
      });

      if (_.isEmpty(listings)) {
        handleNotFound(res);
      } else {
        handleSuccess(res, listings);
      }
    } catch (e) {
      handleInternalServerError(res, e);
      throw new Error(e);
    }
  }
}

export default new ListingsController();
