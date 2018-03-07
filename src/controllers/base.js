import * as web from 'express-decorators';

export default class BaseController {
  @web.use('/tes')
  async detectLanguage(request, response, next) {
    //this.lang = request.acceptsLanguages('en', 'id');
    //this.translator = require('../locale/' + this.lang + '.json');
    next();
  }
}
