import * as web from 'express-decorators';
import BaseController from './base';
import ReferralListerService from '../services/referralListerService';

import { handleSuccess, handleNotFound } from '../libs/responseHandler';

@web.basePath('/v1/listers/')
class Listers extends BaseController {
  @web.get('/')
  async getListerByReferralCode(req, res) {
    const { referralCode } = req.query;
    const result = await ReferralListerService.getListerByReferralCode(
      referralCode
    );
    if (result) {
      handleSuccess(res, { id: result.userId });
    }
    handleNotFound(res);
  }
}

export default new Listers();
