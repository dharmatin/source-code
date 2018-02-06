import * as web from 'express-decorators'
import listingController from '../controllers/listings'

export default (app) => {
  web.register(app, listingController)

  app.use('*', (req, res, next) => {
    res.status(400).send('No page found!');
  })
}
