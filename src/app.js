import express from 'express';
import bodyParser from 'body-parser';
import setRouting from './routes';
import logger from 'morgan';
import setMiddleware from './middleware';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
setMiddleware(app);
setRouting(app);

export default app;
