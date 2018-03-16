// @flow
import config from '../config';
import userInfoTokenService from '../services/userInfoTokenService';
import { handleForbiddenLanguage } from '../libs/responseHandler';

export const setTranslator = async (req: any, res: any, next: any) => {
  let lang = 'id';
  if (req.acceptsLanguages('en', 'id')) {
    lang = req.acceptsLanguages('en', 'id');
  }

  const translator = require(`../config/locales/${lang}.json`);
  config.lang = lang;
  config.translator = translator;
  req.lang = lang;
  next();
};

export default setTranslator;
