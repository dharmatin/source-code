import * as web from 'express-decorators';

export default class BaseController {
  notFoundFormatter = () => {
    return {
      error: {
        code: '3001',
        message: 'Not Found'
      }
    };
  }
}
