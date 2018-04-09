import 'babel-polyfill';
import app from '../app';

if (process.env.NEW_RELIC_LICENSE_KEY) {
  require('newrelic');
}

app.listen(9000, () => {
  console.log('The server is starting 9000');
});
