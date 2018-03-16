// @flow
import config from '../config';
import userInfoTokenService from '../services/userInfoTokenService';
import { handleForbiddenLanguage } from '../libs/responseHandler';

export const setTranslator = async (req: any, res: any, next: any) => {
  const lang = req.acceptsLanguages('en', 'id');
  if (!lang) {
    handleForbiddenLanguage(res);
  } else {
    const translator = require(`../config/locales/${lang}.json`);
    config.lang = lang;
    config.translator = translator;
    req.lang = lang;
    next();
  }
};

export default setTranslator;
