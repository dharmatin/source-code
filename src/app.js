import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import * as web from 'express-decorators';
import setTranslator from './middleware/translator';
import setUserInfoToken from './middleware/tokenAuthInfo';
import baseController from './controllers/base';
import diagnosticController from './controllers/diagnostic';
import listingController from './controllers/listings';
import organisationController from './controllers/organisation';
import referralController from './controllers/referrals';
import amenitiesController from './controllers/amenities';
import articlesController from './controllers/articles';

if (process.env.NEW_RELIC_LICENSE_KEY) {
  require('newrelic');
}

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('*', setTranslator);
app.use('*', setUserInfoToken);

web.register(app, baseController);
web.register(app, listingController);
web.register(app, organisationController);
web.register(app, referralController);
web.register(app, amenitiesController);
web.register(app, articlesController);
web.register(app, diagnosticController);

app.use('*', (req, res, next) => {
  res.status(400).send('No page found!');
});

export default app;
