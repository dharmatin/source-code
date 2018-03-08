import getPort from 'get-port';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/app';
import userInfo from '../fixture/userInfo.json';

chai.use(chaiHttp);
const requester = chai.request(app);
const {expect} = chai;

describe('Authentication Middleware', () => {
  let server;
  before(async() => {
    const port = await getPort();
    server = app.listen(port);
  });

  after(async() => {
    server.close();
  });

  describe('GET /listing/v1/listings/:id', () => {
    it('Should return status code 401 if Authorization header is not valid', (done) => {
      requester
        .get('/listing/v1/listings/nps499')
        .set('Authorization', '123')
        .end((err, res) => {
          expect(err).have.status(401);
          expect(res.body).have.property('error');
          expect(res.body.error).have.property('code').eql(401);
          done();
        });
    });
    it('Should return status code 200 if Authorization header is valid', (done) => {
      const token = userInfo.access_token;
      requester
        .get('/listing/v1/listings/nps499')
        .set('Authorization', token)
        .end((err, res) => {
          expect(err).to.be.a('null');
          expect(res).have.status(200);
          done();
        });
    });
    it('Should return status code 200 if Authorization header is not set', (done) => {
      requester
        .get('/listing/v1/listings/nps499')
        .end((err, res) => {
          expect(err).to.be.a('null');
          expect(res).have.status(200);
          done();
        });
    });
  });
});
