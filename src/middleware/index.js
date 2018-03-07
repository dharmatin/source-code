export default (app) => {
  app.use((req, res, next) => {
    req.lang = req.acceptsLanguages('en', 'id');
    req.translator = require('../locale/' + req.lang + '.json');
    next();
  });
};
