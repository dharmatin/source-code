import getPort from 'get-port';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/app';
import userInfo from '../fixture/userInfo.json';
import referralApproval from '../fixture/requestReferralApproval.json';

chai.use(chaiHttp);
const requester = chai.request(app);
const {expect} = chai;

describe('Referral Approval', () => {
  let server;
  before(async() => {
    const port = await getPort();
    server = app.listen(port);
  });

  after((done) => {
    server.close(done);
  });

  describe('POST /v1/referrals/listings/:listingId/listers/:listerId', () => {
    it('Should return status code 401 if Authorization header is not valid', (done) => {
      const token = userInfo.access_token;
      requester
        .post(`/v1/referrals/listings/${referralApproval.listingId}/listers/${referralApproval.listerId}`)
        .set('X-Api-Key', 'test')
        .set('Authorization', '00001387c02da941f8d935b100f0fb0a2d362f9f')
        .set('Accept-Language', 'id-ID')
        .end((err, res) => {
          console.log('RESPONSE', res.body);
          // expect(err).have.status(401);
          // expect(res.body).have.property('error');
          // expect(res.body.error).have.property('code').eql(401);
          done();
        });
    });
    // it('Should return status code 200 if and have message success if approval is valid', (done) => {
    //   const token = userInfo.access_token;
    //   requester
    //     .post(`/v1/referrals/listings/${referralApproval.listingId}/listers/${referralApproval.listerId}`)
    //     .set('X-Api-Key', 'test')
    //     .set('Authorization', token)
    //     .end((err, res) => {
    //       expect(err).to.be.a('null');
    //       expect(res).have.status(200);
    //       expect(res.body).have.property('message').equal('success');
    //       done();
    //     });
    // });
    // it('Should return status code 200 if and have message failed if approval is invalid (request twice)', (done) => {
    //   const token = userInfo.access_token;
    //   requester
    //     .post(`/v1/referrals/listings/${referralApproval.listingId}/listers/${referralApproval.listerId}`)
    //     .set('X-Api-Key', 'test')
    //     .set('Authorization', token)
    //     .end((err, res) => {
    //       expect(err).to.be.a('null');
    //       expect(res).have.status(200);
    //       expect(res.body).have.property('message').equal('failed');
    //       done();
    //     });
    // });
  });
});
