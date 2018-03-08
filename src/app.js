import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import * as web from 'express-decorators';
import setTranslator from './middleware/translator';
import setUserInfoToken from './middleware/token';
import baseController from './controllers/base';
import listingController from './controllers/listings';
import organisationController from './controllers/organisation';
import referralController from './controllers/referrals';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('*', setTranslator);
app.use('*', setUserInfoToken);

web.register(app, baseController);
web.register(app, listingController);
web.register(app, organisationController);
web.register(app, referralController);

app.use('*', (req, res, next) => {
  res.status(400).send('No page found!');
});

export default app;
