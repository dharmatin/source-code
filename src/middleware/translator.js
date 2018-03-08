// @flow
import userInfoTokenService from '../services/userInfoTokenService';

export const setTranslator = async(req: any, res: any, next: any) => {
  const lang = req.acceptsLanguages('en', 'id');
  const translator = require(`../config/locales/${lang}.json`);
  req.app.set('translator', translator);
  next();
};

export default setTranslator;
