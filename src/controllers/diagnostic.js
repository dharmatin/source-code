import * as web from 'express-decorators';
import BaseController from './base';
import * as packageInfo from '../../package.json';

import { handleSuccess } from '../libs/responseHandler';

@web.basePath('/status')
class DiagnosticController extends BaseController {
  @web.get('/heartbeat')
  heartBeatAction(req, res, next) {
    handleSuccess(res, { status: 'OK' });
  }

  @web.get('/version')
  versionAction(req, res, next) {
    handleSuccess(res, { version: packageInfo.version });
  }
}

export default new DiagnosticController();
