import * as web from 'express-decorators';
import listingController from '../controllers/listings';
import organisationController from '../controllers/organisation';

export default (app) => {
  web.register(app, listingController);
  web.register(app, organisationController);

  app.use('*', (req, res, next) => {
    res.status(400).send('No page found!');
  });
};
