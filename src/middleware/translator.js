// @flow
import config from '../config';

export const setTranslator = async(req: any, res: any, next: any): any => {
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
