import getPort from 'get-port';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/app';
import userGroup from '../fixture/userGroup.json';
import requestReferral from '../fixture/requestReferralApproval.json';

chai.use(chaiHttp);
const requester = chai.request(app);
const {expect} = chai;

describe('UserGroup Middleware', () => {
  let server;
  before(async() => {
    const port = await getPort();
    server = app.listen(port);
  });

  after(async() => {
    server.close();
  });
  describe('Validation Customer userGroup', () => {
    describe('POST /v1/referrals/listings/:listingId/apply', () => {
      it('Should return status code 200 if Authorization userGroup is Customer', (done) => {
        requester
          .post(`/v1/referrals/listings/nps1527/apply`)
          .set('Authorization', userGroup.accessTokenCustomer)
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
      it('Should return status code 401 if Authorization userGroup is Developer', (done) => {
        requester
          .post(`/v1/referrals/listings/nps1527/apply`)
          .set('Authorization', userGroup.accessTokenDeveloper)
          .end((err, res) => {
            expect(err).have.status(401);
            expect(res.body).have.property('error');
            expect(res.body.error).have.property('code').eql(401);
            done();
          });
      });
    });
  });

  describe('Validation Developer userGroup', () => {
    describe('POST /v1/referrals/listings/:listingId/listers/:listerId', () => {
      it('Should return status code 200 if Authorization userGroup is Developer', (done) => {
        requester
          .post(`/v1/referrals/listings/nps1527/listers/70491`)
          .set('Authorization', userGroup.accessTokenDeveloper)
          .end((err, res) => {
            expect(err).to.be.a('null');
            expect(res).have.status(200);
            done();
          });
      });
      it('Should return status code 401 if Authorization userGroup is Customer', (done) => {
        requester
          .post(`/v1/referrals/listings/nps1527/listers/70491`)
          .set('Authorization', userGroup.accessTokenCustomer)
          .end((err, res) => {
            expect(err).have.status(401);
            expect(res.body).have.property('error');
            expect(res.body.error).have.property('code').eql(401);
            done();
          });
      });
    });
  });
});
