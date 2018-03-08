import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import setMiddleware from './middleware';
import setRouting from './routes';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
setMiddleware(app);
setRouting(app);

export default app;
