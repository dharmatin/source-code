import getPort from 'get-port';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/app';
import userGroup from '../fixture/userGroup.json';

chai.use(chaiHttp);
const requester = chai.request(app);
const {expect} = chai;

describe('Referral Request', () => {
  let server;
  before(async() => {
    const port = await getPort();
    server = app.listen(port);
  });

  after(async() => {
    server.close();
  });

  describe('POST /v1/referrals/listings/:listingId/apply', () => {
    it('Should return status code 200 if Authorization header is valid', (done) => {
      const token = userGroup.accessTokenCustomer;
      requester
        .post('/v1/referrals/listings/nps1503/apply')
        .set('Authorization', token)
        .send({
          'isSubscribed': 0,
          'message': 'ada ajah'
        })
        .end((err, res) => {
          expect(err).to.be.a('null');
          expect(res).have.status(200);
          done();
        });
    });

    it('Should return status code 401 if Authorization header is not valid', (done) => {
      requester
        .post('/v1/referrals/listings/nps1503/apply')
        .set('Authorization', '123')
        .end((err, res) => {
          expect(err).have.status(401);
          expect(res.body).have.property('error');
          expect(res.body.error).have.property('code').eql(401);
          done();
        });
    });
  });
});
