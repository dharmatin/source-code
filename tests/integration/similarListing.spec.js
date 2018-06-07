import _ from 'lodash';
import getPort from 'get-port';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/app';
import addListing from '../fixture/saveListingSimilarity';
chai.use(chaiHttp);
const requester = chai.request(app);
const {expect} = chai;

describe('Similar Listing', () => {
  let server;
  before(async() => {
    const port = await getPort();
    server = app.listen(port);
    await addListing();
  });

  after((done) => {
    server.close(done);
  });

  describe('GET /listing/v1/listings/similar/:id', () => {
    describe('#TEST1 Unmatch Location', () => {
      it('Should return 404 with error code 3001', (done) => {
        requester
          .get('/listing/v1/listings/similar/hosTest1')
          .set('X-Api-Key', 'test')
          .set('Accept-Language', 'id-ID')
          .end((err, res) => {
            expect(err).have.status(404);
            expect(res.body.error).have.property('code').eql('3001');
            done();
          });
      });
    });

    describe('#TEST2 Unmatch Property Type', () => {
      it('Should return 404 with error code 3001', (done) => {
        requester
          .get('/listing/v1/listings/similar/hosTest2')
          .set('X-Api-Key', 'test')
          .set('Accept-Language', 'id-ID')
          .end((err, res) => {
            expect(err).have.status(404);
            expect(res.body.error).have.property('code').eql('3001');
            done();
          });
      });
    });

    describe('#TEST3 Unmatch Price', () => {
      it('Should return 404 with error code 3001', (done) => {
        requester
          .get('/listing/v1/listings/similar/hosTest3')
          .set('X-Api-Key', 'test')
          .set('Accept-Language', 'id-ID')
          .end((err, res) => {
            expect(err).have.status(404);
            expect(res.body.error).have.property('code').eql('3001');
            done();
          });
      });
    });

    describe('#TEST4 Unmatch Size', () => {
      it('Should return 404 with error code 3001', (done) => {
        requester
          .get('/listing/v1/listings/similar/hosTest4')
          .set('X-Api-Key', 'test')
          .set('Accept-Language', 'id-ID')
          .end((err, res) => {
            expect(err).have.status(404);
            expect(res.body.error).have.property('code').eql('3001');
            done();
          });
      });
    });

    describe('#TEST5 Match property type, location 1, building size, land size', () => {
      it('Should return 200 http code listing response', (done) => {
        requester
          .get('/listing/v1/listings/similar/hosTest5')
          .set('X-Api-Key', 'test')
          .set('Accept-Language', 'id-ID')
          .end((err, res) => {
            expect(err).is.eql(null);
            expect(res).have.status(200);
            const ids = _.map(res.body.items, (value: Object): any => {
              return value.id;
            });
            expect(ids).to.deep.equal(['hosORYHI001', 'hosORYHI003', 'hosNILAHI004', 'hosNILAHI005']);
            done();
          });
      });
    });

    describe('#TEST6 Match property type, location 1, price, land size with ignored built up value', () => {
      it('Should return 200 http code return same agent with sorted tier in location 3 or 2 or 1 with location 3 first' +
      'and will return different agent with same condition with same agent', (done) => {
        requester
          .get('/listing/v1/listings/similar/hosTest6')
          .set('X-Api-Key', 'test')
          .set('Accept-Language', 'id-ID')
          .end((err, res) => {
            expect(err).is.eql(null);
            expect(res).have.status(200);
            const ids = _.map(res.body.items, (value: Object): any => {
              return value.id;
            });
            expect(ids).to.deep.equal(['hosORYHI001', 'hosNILAHI004']);
            done();
          });
      });
    });

    describe('#TEST7 Match property type, location 1, price, building size with ignoring land size', () => {
      it('Should be return same agent with sorted tier in location 3 or 2 or 1 with location 3 first' +
        'and will return different agent with same condition with same agent', (done) => {
        requester
          .get('/listing/v1/listings/similar/hosTest7')
          .set('X-Api-Key', 'test')
          .set('Accept-Language', 'id-ID')
          .end((err, res) => {
            expect(err).is.eql(null);
            expect(res).have.status(200);
            const ids = _.map(res.body.items, (value: Object): any => {
              return value.id;
            });
            expect(ids).to.deep.equal(['hosORYHI001']);
            done();
          });
      });
    });

    describe('#TEST8 Match property type, location 1, price with ignoring building size and land size', () => {
      it('Should be return same agent with sorted tier in location 3 or 2 or 1 with location 3 first' +
      'and will return different agent with same condition with same agent', (done) => {
        requester
          .get('/listing/v1/listings/similar/hosTest8')
          .set('X-Api-Key', 'test')
          .set('Accept-Language', 'id-ID')
          .end((err, res) => {
            expect(err).is.eql(null);
            expect(res).have.status(200);
            const ids = _.map(res.body.items, (value: Object): any => {
              return value.id;
            });
            expect(ids).to.deep.equal(['hosORYHI001', 'hosABIHI001', 'hosDENIHI004', 'hosNILAHI004', 'hosABIJA001', 'hosDENIJA003']);
            done();
          });
      });
    });

    describe('#TEST9 Match property type, location 1, land size, unmatch building size and ignoring price', () => {
      it('Should be return same agent with sorted tier in location 3 or 2 or 1 with location 3 first' +
      'and will return different agent with same condition with same agent', (done) => {
        requester
          .get('/listing/v1/listings/similar/hosTest9')
          .set('X-Api-Key', 'test')
          .set('Accept-Language', 'id-ID')
          .end((err, res) => {
            expect(err).is.eql(null);
            expect(res).have.status(200);
            const ids = _.map(res.body.items, (value: Object): any => {
              return value.id;
            });
            expect(ids).to.deep.equal(['hosORYHI001', 'hosORYHI003', 'hosNILAHI004', 'hosNILAHI005']);
            done();
          });
      });
    });

    describe('#TEST10 Match property type, location 1, land size, unmatch building size and ignoring price', () => {
      it('Should be return same agent with sorted tier in location 3 or 2 or 1 with location 3 first' +
      'and will return different agent with same condition with same agent', (done) => {
        requester
          .get('/listing/v1/listings/similar/hosTest10')
          .set('X-Api-Key', 'test')
          .set('Accept-Language', 'id-ID')
          .end((err, res) => {
            expect(err).is.eql(null);
            expect(res).have.status(200);
            const ids = _.map(res.body.items, (value: Object): any => {
              return value.id;
            });
            expect(ids).to.deep.equal(['hosORYSB005', 'hosORYSB007', 'hosABISB001', 'hosABISB002', 'hosDENISB003', 'hosDENISB004']);
            done();
          });
      });
    });

    describe('#TEST11 Match property type, location 1, land size, unmatch building size and ignoring price', () => {
      it('Should be return same agent with sorted tier in location 3 or 2 or 1 with location 3 first' +
      'and will return different agent with same condition with same agent', (done) => {
        requester
          .get('/listing/v1/listings/similar/hosTest11')
          .set('X-Api-Key', 'test')
          .set('Accept-Language', 'id-ID')
          .end((err, res) => {
            expect(err).is.eql(null);
            expect(res).have.status(200);
            const ids = _.map(res.body.items, (value: Object): any => {
              return value.id;
            });
            expect(ids).to.deep.equal(['hosORYSB005', 'hosORYSB007', 'hosABISB001', 'hosDENISB003']);
            done();
          });
      });
    });

    describe('#TEST12 Match property type, location 1, land size, unmatch building size and ignoring price', () => {
      it('Should be return same agent with sorted tier in location 3 or 2 or 1 with location 3 first' +
      'and will return different agent with same condition with same agent', (done) => {
        requester
          .get('/listing/v1/listings/similar/hosTest12')
          .set('X-Api-Key', 'test')
          .set('Accept-Language', 'id-ID')
          .end((err, res) => {
            expect(err).is.eql(null);
            expect(res).have.status(200);
            const ids = _.map(res.body.items, (value: Object): any => {
              return value.id;
            });
            expect(ids).to.deep.equal(['hosDENIHI004', 'hosDENIJA003', 'hosABIHI001', 'hosABIJA001', 'hosNILAHI004', 'hosORYHI001']);
            done();
          });
      });
    });

    describe('#TEST13 Match property type, location 1, land size, unmatch building size and ignoring price', () => {
      it('Should be return same agent with sorted tier in location 3 or 2 or 1 with location 3 first' +
      'and will return different agent with same condition with same agent', (done) => {
        requester
          .get('/listing/v1/listings/similar/hosTest13')
          .set('X-Api-Key', 'test')
          .set('Accept-Language', 'id-ID')
          .end((err, res) => {
            expect(err).is.eql(null);
            expect(res).have.status(200);
            const ids = _.map(res.body.items, (value: Object): any => {
              return value.id;
            });
            expect(ids).to.deep.equal(['hosDENIM003', 'hosABIM001', 'hosDENIHI004', 'hosDENIJA003', 'hosABIHI001', 'hosABIJA001']);
            done();
          });
      });
    });

    describe('#TEST14 Match property type, location 1, land size, unmatch building size and ignoring price', () => {
      it('Should be return same agent with sorted tier in location 3 or 2 or 1 with location 3 first' +
      'and will return different agent with same condition with same agent', (done) => {
        requester
          .get('/listing/v1/listings/similar/hosTest14')
          .set('X-Api-Key', 'test')
          .set('Accept-Language', 'id-ID')
          .end((err, res) => {
            expect(err).is.eql(null);
            expect(res).have.status(200);
            const ids = _.map(res.body.items, (value: Object): any => {
              return value.id;
            });
            expect(ids).to.deep.equal(['hosDENISB003', 'hosABISB001', 'hosORYSB005', 'hosORYSB007']);
            done();
          });
      });
    });
  });
});
