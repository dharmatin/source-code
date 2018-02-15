import express from 'express';
import bodyParser from 'body-parser';
import setRouting from './routes';
import logger from 'morgan';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

setRouting(app);

export default app;
