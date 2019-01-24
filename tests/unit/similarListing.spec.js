// @flow
import _ from 'lodash';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import secondaryListingDao from '../../src/dao/secondaryListings';
import { SimilarListingService } from '../../src/services/similarListingService';
import config from '../../src/config';
import PrimaryListingDao from '../../src/dao/listings';
import UsersDao from '../../src/dao/users';
import similarityReferralSolrResponse from '../fixture/similarityReferralSolrResponse';
import agentReferralResponse from '../fixture/agentReferralResponse';

declare var describe: any;
declare var it: any;
declare var afterEach: any;
declare var before: any;

chai.use(chaiAsPromised);
chai.use(sinonChai);

const { expect } = chai;
const sandbox = sinon.createSandbox();

describe('--- Similarity Listing ---', () => {
  before(() => {
    config.lang = 'id';
    config.translator = require(`../../src/config/locales/${config.lang}.json`);
  });
  afterEach(() => {
    sandbox.restore();
  });
  describe('#TEST1 Unmatch Location', () => {
    it('Should be return empty response', async(): any => {
      const solrListingResponse = {
        responseHeader: {
          status: 0,
          QTime: 0,
        },
        response: {
          numFound: 0,
          docs: [
            {
              id: 'hosTest1',
              type: 'ho',
              building_size: 110, // eslint-disable-line camelcase
              land_size: 75, // eslint-disable-line camelcase
              city_id: 46, // eslint-disable-line camelcase
              district_id: 1200, // eslint-disable-line camelcase
              province_id: 3, // eslint-disable-line camelcase
              price: 1000000000,
              agent: 779270,
            },
          ],
        },
      };
      const similarityResponse = {
        response: {
          numFound: 0,
          docs: [],
        },
      };
      sandbox
        .stub(secondaryListingDao, 'getListingById')
        .callsFake((): Object => solrListingResponse);
      sandbox
        .stub(secondaryListingDao, 'searchSimilarity')
        .callsFake((): Object => similarityResponse);
      const service = new SimilarListingService(
        PrimaryListingDao,
        secondaryListingDao,
        UsersDao
      );
      const result = await service.searchSimilarityById('hosTest1');
      expect(result.items)
        .to.be.an('array')
        .that.eql([]);
    });
  });
  describe('#TEST2 Unmatch Property Type', () => {
    it('Should be return empty response', async(): any => {
      const solrListingResponse = {
        responseHeader: {
          status: 0,
          QTime: 0,
        },
        response: {
          numFound: 0,
          docs: [
            {
              id: 'apsTest2',
              type: 'ap',
              building_size: 120, // eslint-disable-line camelcase
              land_size: 70, // eslint-disable-line camelcase
              city_id: 60, // eslint-disable-line camelcase
              district_id: 2807, // eslint-disable-line camelcase
              province_id: 6, // eslint-disable-line camelcase
              price: 1000000000,
              agent: 779270,
            },
          ],
        },
      };
      const similarityResponse = {
        response: {
          numFound: 0,
          docs: [],
        },
      };
      sandbox
        .stub(secondaryListingDao, 'getListingById')
        .callsFake((): Object => solrListingResponse);
      sandbox
        .stub(secondaryListingDao, 'searchSimilarity')
        .callsFake((): Object => similarityResponse);
      const service = new SimilarListingService(
        PrimaryListingDao,
        secondaryListingDao,
        UsersDao
      );
      const result = await service.searchSimilarityById('hosTest1');
      expect(result.items)
        .to.be.an('array')
        .that.eql([]);
    });
  });

  describe('#TEST3 Unmatch Price', () => {
    it('Should be return empty response', async(): any => {
      const solrListingResponse = {
        responseHeader: {
          status: 0,
          QTime: 0,
        },
        response: {
          numFound: 0,
          docs: [
            {
              id: 'hosTest3',
              type: 'ho',
              building_size: 120, // eslint-disable-line camelcase
              land_size: 120, // eslint-disable-line camelcase
              city_id: 60, // eslint-disable-line camelcase
              district_id: 2807, // eslint-disable-line camelcase
              province_id: 6, // eslint-disable-line camelcase
              price: 2000000000,
              agent: 779270,
            },
          ],
        },
      };
      const similarityResponse = {
        response: {
          numFound: 0,
          docs: [],
        },
      };
      sandbox
        .stub(secondaryListingDao, 'getListingById')
        .callsFake((): Object => solrListingResponse);
      sandbox
        .stub(secondaryListingDao, 'searchSimilarity')
        .callsFake((): Object => similarityResponse);
      const service = new SimilarListingService(
        PrimaryListingDao,
        secondaryListingDao,
        UsersDao
      );
      const result = await service.searchSimilarityById('hosTest1');
      expect(result.items)
        .to.be.an('array')
        .that.eql([]);
    });
  });

  describe('#TEST4 Unmatch Size', () => {
    it('Should be return empty response', async(): any => {
      const solrListingResponse = {
        responseHeader: {
          status: 0,
          QTime: 0,
        },
        response: {
          numFound: 0,
          docs: [
            {
              id: 'hosTest4',
              type: 'ho',
              building_size: 650, // eslint-disable-line camelcase
              land_size: 800, // eslint-disable-line camelcase
              city_id: 60, // eslint-disable-line camelcase
              district_id: 2807, // eslint-disable-line camelcase
              province_id: 6, // eslint-disable-line camelcase
              price: 1000000000,
              agent: 779270,
            },
          ],
        },
      };
      const similarityResponse = {
        response: {
          numFound: 0,
          docs: [],
        },
      };
      sandbox
        .stub(secondaryListingDao, 'getListingById')
        .callsFake((): Object => solrListingResponse);
      sandbox
        .stub(secondaryListingDao, 'searchSimilarity')
        .callsFake((): Object => similarityResponse);
      const service = new SimilarListingService(
        PrimaryListingDao,
        secondaryListingDao,
        UsersDao
      );
      const result = await service.searchSimilarityById('hosTest1');
      expect(result.items)
        .to.be.an('array')
        .that.eql([]);
    });
  });

  describe('#TEST5 Match property type, location 1, building size, land size', () => {
    it(
      'Should be return same agent with sorted tier in location 3 or 2 or 1 with location 3 first' +
        'and will return different agent with same condition with same agent',
      async(): any => {
        const solrListingResponse = {
          responseHeader: {
            status: 0,
            QTime: 0,
          },
          response: {
            numFound: 0,
            docs: [
              {
                id: 'hosTest5',
                type: 'ho',
                building_size: 200, // eslint-disable-line camelcase
                land_size: 200, // eslint-disable-line camelcase
                city_id: 60, // eslint-disable-line camelcase
                district_id: 2807, // eslint-disable-line camelcase
                province_id: 6, // eslint-disable-line camelcase
                price: 0,
                agent: 735277,
              },
            ],
          },
        };
        const similarityResponse = require('../fixture/testCase5SimilaritySolrResponse.json');
        sandbox
          .stub(secondaryListingDao, 'getListingById')
          .callsFake((): Object => solrListingResponse);
        sandbox
          .stub(secondaryListingDao, 'searchSimilarity')
          .callsFake((): Object => similarityResponse);
        const service = new SimilarListingService(
          PrimaryListingDao,
          secondaryListingDao,
          UsersDao
        );
        const result = await service.searchSimilarityById('hosTest5');
        const ids = _.map(result.items, (value: Object): any => {
          return value.id;
        });
        expect(ids).to.deep.equal([
          'hosORYHI001',
          'hosORYHI003',
          'hosNILAHI004',
          'hosNILAHI005',
        ]);
      }
    );
  });

  describe('#TEST6 Match property type, location 1, price, land size with ignored built up value', () => {
    it(
      'Should be return same agent with sorted tier in location 3 or 2 or 1 with location 3 first' +
        'and will return different agent with same condition with same agent',
      async(): any => {
        const solrListingResponse = {
          responseHeader: {
            status: 0,
            QTime: 0,
          },
          response: {
            numFound: 0,
            docs: [
              {
                id: 'hosTest6',
                type: 'ho',
                building_size: 0, // eslint-disable-line camelcase
                land_size: 200, // eslint-disable-line camelcase
                city_id: 60, // eslint-disable-line camelcase
                district_id: 2807, // eslint-disable-line camelcase
                province_id: 6, // eslint-disable-line camelcase
                price: 1000000000, // eslint-disable-line camelcase
                agent: 735277,
              },
            ],
          },
        };
        const similarityResponse = require('../fixture/testCase6SimilaritySolrResponse.json');
        sandbox
          .stub(secondaryListingDao, 'getListingById')
          .callsFake((): Object => solrListingResponse);
        sandbox
          .stub(secondaryListingDao, 'searchSimilarity')
          .callsFake((): Object => similarityResponse);
        const service = new SimilarListingService(
          PrimaryListingDao,
          secondaryListingDao,
          UsersDao
        );
        const result = await service.searchSimilarityById('hosTest6');
        const ids = _.map(result.items, (value: Object): any => {
          return value.id;
        });
        expect(ids).to.deep.equal(['hosORYHI001', 'hosNILAHI004']);
      }
    );
  });

  describe('#TEST7 Match property type, location 1, price, building size with ignoring land size', () => {
    it(
      'Should be return same agent with sorted tier in location 3 or 2 or 1 with location 3 first' +
        'and will return different agent with same condition with same agent',
      async(): any => {
        const solrListingResponse = {
          responseHeader: {
            status: 0,
            QTime: 0,
          },
          response: {
            numFound: 0,
            docs: [
              {
                id: 'hosTest7',
                type: 'ho',
                building_size: 200, // eslint-disable-line camelcase
                land_size: 0, // eslint-disable-line camelcase
                city_id: 60, // eslint-disable-line camelcase
                district_id: 2807, // eslint-disable-line camelcase
                province_id: 6, // eslint-disable-line camelcase
                price: 1000000000,
                agent: 735277,
              },
            ],
          },
        };
        const similarityResponse = require('../fixture/testCase7SimilaritySolrResponse.json');
        sandbox
          .stub(secondaryListingDao, 'getListingById')
          .callsFake((): Object => solrListingResponse);
        sandbox
          .stub(secondaryListingDao, 'searchSimilarity')
          .callsFake((): Object => similarityResponse);
        const service = new SimilarListingService(
          PrimaryListingDao,
          secondaryListingDao,
          UsersDao
        );
        const result = await service.searchSimilarityById('hosTest7');
        const ids = _.map(result.items, (value: Object): any => {
          return value.id;
        });
        expect(ids).to.deep.equal(['hosORYHI001']);
      }
    );
  });

  describe('#TEST8 Match property type, location 1, price with ignoring building size and land size', () => {
    it(
      'Should be return same agent with sorted tier in location 3 or 2 or 1 with location 3 first' +
        'and will return different agent with same condition with same agent',
      async(): any => {
        const solrListingResponse = {
          responseHeader: {
            status: 0,
            QTime: 0,
          },
          response: {
            numFound: 0,
            docs: [
              {
                id: 'hosTest8',
                type: 'ho',
                building_size: 0, // eslint-disable-line camelcase
                land_size: 0, // eslint-disable-line camelcase
                city_id: 60, // eslint-disable-line camelcase
                district_id: 2807, // eslint-disable-line camelcase
                province_id: 6, // eslint-disable-line camelcase
                price: 1000000000,
                agent: 735277,
              },
            ],
          },
        };
        const similarityResponse = require('../fixture/testCase8SimilaritySolrResponse.json');
        sandbox
          .stub(secondaryListingDao, 'getListingById')
          .callsFake((): Object => solrListingResponse);
        sandbox
          .stub(secondaryListingDao, 'searchSimilarity')
          .callsFake((): Object => similarityResponse);
        const service = new SimilarListingService(
          PrimaryListingDao,
          secondaryListingDao,
          UsersDao
        );
        const result = await service.searchSimilarityById('hosTest8');
        const ids = _.map(result.items, (value: Object): any => {
          return value.id;
        });
        expect(ids).to.deep.equal([
          'hosORYHI001',
          'hosABIHI001',
          'hosDENIHI004',
          'hosNILAHI004',
          'hosABIJA001',
          'hosDENIJA003',
        ]);
      }
    );
  });

  describe('#TEST9 Match property type, location 1, land size, unmatch building size and ignoring price', () => {
    it(
      'Should be return same agent with sorted tier in location 3 or 2 or 1 with location 3 first' +
        'and will return different agent with same condition with same agent',
      async(): any => {
        const solrListingResponse = {
          responseHeader: {
            status: 0,
            QTime: 0,
          },
          response: {
            numFound: 0,
            docs: [
              {
                id: 'hosTest9',
                type: 'ho',
                building_size: 50, // eslint-disable-line camelcase
                land_size: 200, // eslint-disable-line camelcase
                city_id: 60, // eslint-disable-line camelcase
                district_id: 2807, // eslint-disable-line camelcase
                province_id: 6, // eslint-disable-line camelcase
                price: 0,
                agent: 735277,
              },
            ],
          },
        };
        const similarityResponse = require('../fixture/testCase9SimilaritySolrResponse.json');
        sandbox
          .stub(secondaryListingDao, 'getListingById')
          .callsFake((): Object => solrListingResponse);
        sandbox
          .stub(secondaryListingDao, 'searchSimilarity')
          .callsFake((): Object => similarityResponse);
        const service = new SimilarListingService(
          PrimaryListingDao,
          secondaryListingDao,
          UsersDao
        );
        const result = await service.searchSimilarityById('hosTest9');
        const ids = _.map(result.items, (value: Object): any => {
          return value.id;
        });
        expect(ids).to.deep.equal([
          'hosORYHI001',
          'hosORYHI003',
          'hosNILAHI004',
          'hosNILAHI005',
        ]);
      }
    );
  });

  describe('#TEST10 Match property type, location 1, unmatch building size & land size with zero price', () => {
    it(
      'Should be return same agent with sorted tier in location 3 or 2 or 1 with location 3 first' +
        'and will return different agent with same condition with same agent',
      async(): any => {
        const solrListingResponse = {
          responseHeader: {
            status: 0,
            QTime: 0,
          },
          response: {
            numFound: 0,
            docs: [
              {
                id: 'hosTest10',
                type: 'ho',
                building_size: 0, // eslint-disable-line camelcase
                land_size: 0, // eslint-disable-line camelcase
                city_id: 36, // eslint-disable-line camelcase
                district_id: 1080, // eslint-disable-line camelcase
                province_id: 1, // eslint-disable-line camelcase
                price: 0,
                agent: 735277,
              },
            ],
          },
        };
        const similarityResponse = require('../fixture/testCase10SimilaritySolrResponse.json');
        sandbox
          .stub(secondaryListingDao, 'getListingById')
          .callsFake((): Object => solrListingResponse);
        sandbox
          .stub(secondaryListingDao, 'searchSimilarity')
          .callsFake((): Object => similarityResponse);
        const service = new SimilarListingService(
          PrimaryListingDao,
          secondaryListingDao,
          UsersDao
        );
        const result = await service.searchSimilarityById('hosTest10');
        const ids = _.map(result.items, (value: Object): any => {
          return value.id;
        });

        expect(ids).to.deep.equal([
          'hosORYSB005',
          'hosORYSB007',
          'hosABISB001',
          'hosABISB002',
          'hosDENISB003',
          'hosDENISB004',
        ]);
      }
    );
  });

  describe('#TEST11 Match, but the result have zero price/size so it will ignore as the result', () => {
    it(
      'Should be return same agent with sorted tier in location 3 or 2 or 1 with location 3 first' +
        'and will return different agent with same condition with same agent',
      async(): any => {
        const solrListingResponse = {
          responseHeader: {
            status: 0,
            QTime: 0,
          },
          response: {
            numFound: 0,
            docs: [
              {
                id: 'hosTest11',
                type: 'ho',
                building_size: 0, // eslint-disable-line camelcase
                land_size: 0, // eslint-disable-line camelcase
                city_id: 36, // eslint-disable-line camelcase
                district_id: 1080, // eslint-disable-line camelcase
                province_id: 1, // eslint-disable-line camelcase
                price: 1000000000, // eslint-disable-line camelcase
                agent: 735277,
              },
            ],
          },
        };
        const similarityResponse = require('../fixture/testCase11SimilaritySolrResponse.json');
        sandbox
          .stub(secondaryListingDao, 'getListingById')
          .callsFake((): Object => solrListingResponse);
        sandbox
          .stub(secondaryListingDao, 'searchSimilarity')
          .callsFake((): Object => similarityResponse);
        const service = new SimilarListingService(
          PrimaryListingDao,
          secondaryListingDao,
          UsersDao
        );
        const result = await service.searchSimilarityById('hosTest11');
        const ids = _.map(result.items, (value: Object): any => {
          return value.id;
        });

        expect(ids).to.deep.equal([
          'hosORYSB005',
          'hosORYSB007',
          'hosABISB001',
          'hosDENISB003',
        ]);
      }
    );
  });

  describe('#TEST12 Match, No Location 3', () => {
    it(
      'Should be return same agent with sorted tier in location 3 or 2 or 1 with location 3 first' +
        'and will return different agent with same condition with same agent',
      async(): any => {
        const solrListingResponse = {
          responseHeader: {
            status: 0,
            QTime: 0,
          },
          response: {
            numFound: 0,
            docs: [
              {
                id: 'hosTest12',
                type: 'ho',
                building_size: 0, // eslint-disable-line camelcase
                land_size: 0, // eslint-disable-line camelcase
                city_id: 60, // eslint-disable-line camelcase
                district_id: 2111, // eslint-disable-line camelcase
                province_id: 6, // eslint-disable-line camelcase
                price: 1000000000,
                agent: 8279,
              },
            ],
          },
        };
        const similarityResponse = require('../fixture/testCase12SimilaritySolrResponse.json');
        sandbox
          .stub(secondaryListingDao, 'getListingById')
          .callsFake((): Object => solrListingResponse);
        sandbox
          .stub(secondaryListingDao, 'searchSimilarity')
          .callsFake((): Object => similarityResponse);
        const service = new SimilarListingService(
          PrimaryListingDao,
          secondaryListingDao,
          UsersDao
        );
        const result = await service.searchSimilarityById('hosTest12');
        const ids = _.map(result.items, (value: Object): any => {
          return value.id;
        });
        expect(ids).to.deep.equal([
          'hosDENIHI004',
          'hosDENIJA003',
          'hosABIHI001',
          'hosABIJA001',
          'hosNILAHI004',
          'hosORYHI001',
        ]);
      }
    );
  });

  describe('#TEST13 Match, No Location 3', () => {
    it(
      'Should be return same agent with sorted tier in location 3 or 2 or 1 with location 3 first' +
        'and will return different agent with same condition with same agent',
      async(): any => {
        const solrListingResponse = {
          responseHeader: {
            status: 0,
            QTime: 0,
          },
          response: {
            numFound: 0,
            docs: [
              {
                id: 'hosTest13',
                type: 'ho',
                building_size: 0, // eslint-disable-line camelcase
                land_size: 0, // eslint-disable-line camelcase
                city_id: 50, // eslint-disable-line camelcase
                district_id: 3000, // eslint-disable-line camelcase
                province_id: 6, // eslint-disable-line camelcase
                price: 1000000000,
                agent: 8279,
              },
            ],
          },
        };
        const similarityResponse = require('../fixture/testCase13SimilaritySolrResponse.json');
        sandbox
          .stub(secondaryListingDao, 'getListingById')
          .callsFake((): Object => solrListingResponse);
        sandbox
          .stub(secondaryListingDao, 'searchSimilarity')
          .callsFake((): Object => similarityResponse);
        const service = new SimilarListingService(
          PrimaryListingDao,
          secondaryListingDao,
          UsersDao
        );
        const result = await service.searchSimilarityById('hosTest13');
        const ids = _.map(result.items, (value: Object): any => {
          return value.id;
        });

        expect(ids).to.deep.equal([
          'hosDENIM003',
          'hosABIM001',
          'hosDENIHI004',
          'hosDENIJA003',
          'hosABIHI001',
          'hosABIJA001',
        ]);
      }
    );
  });

  describe('#TEST14 Match, No Location 2', () => {
    it(
      'Should be return same agent with sorted tier in location 3 or 2 or 1 with location 3 first' +
        'and will return different agent with same condition with same agent',
      async(): any => {
        const solrListingResponse = {
          responseHeader: {
            status: 0,
            QTime: 0,
          },
          response: {
            numFound: 0,
            docs: [
              {
                id: 'hosTest14',
                type: 'ho',
                building_size: 0, // eslint-disable-line camelcase
                land_size: 0, // eslint-disable-line camelcase
                city_id: 39, // eslint-disable-line camelcase
                district_id: 1122, // eslint-disable-line camelcase
                province_id: 1, // eslint-disable-line camelcase
                price: 1000000000,
                agent: 8279,
              },
            ],
          },
        };
        const similarityResponse = require('../fixture/testCase14SimilaritySolrResponse.json');
        sandbox
          .stub(secondaryListingDao, 'getListingById')
          .callsFake((): Object => solrListingResponse);
        sandbox
          .stub(secondaryListingDao, 'searchSimilarity')
          .callsFake((): Object => similarityResponse);
        const service = new SimilarListingService(
          PrimaryListingDao,
          secondaryListingDao,
          UsersDao
        );
        const result = await service.searchSimilarityById('hosTest14');
        const ids = _.map(result.items, (value: Object): any => {
          return value.id;
        });

        expect(ids).to.deep.equal([
          'hosDENISB003',
          'hosABISB001',
          'hosORYSB005',
          'hosORYSB007',
        ]);
      }
    );
  });

  describe('#getListingById solr did not have docs', () => {
    it('Should be return empty response', (): any => {
      const solrListingResponse = {
        responseHeader: {
          status: 0,
          QTime: 0,
        },
        response: {
          numFound: 0,
          docs: [],
        },
      };
      sandbox
        .stub(secondaryListingDao, 'getListingById')
        .callsFake((): Object => solrListingResponse);
      const service = new SimilarListingService(
        PrimaryListingDao,
        secondaryListingDao,
        UsersDao
      );
      const result = service.searchSimilarityById('hosTest14');
      expect(result)
        .is.eventually.an('object')
        .that.eql({});
    });
  });

  describe('#getListingById solr status error', () => {
    it('Should be return solr error', (): any => {
      const solrListingResponse = {
        responseHeader: {
          status: 1,
          QTime: 0,
        },
      };
      sandbox
        .stub(secondaryListingDao, 'getListingById')
        .callsFake((): Object => solrListingResponse);
      const service = new SimilarListingService(
        PrimaryListingDao,
        secondaryListingDao,
        UsersDao
      );
      const result = service.searchSimilarityById('hosTest14');
      expect(result)
        .to.eventually.be.rejectedWith('Solr search error')
        .and.be.an.instanceOf(Error);
    });
  });
});

describe('--- Similarity Listing Referral ---', () => {
  before(() => {
    config.lang = 'id';
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('Should be correct response Similar Listing Referral', async(): any => {
    sandbox
      .stub(UsersDao, 'findAgentReferralByUserId')
      .callsFake((): Object => agentReferralResponse);
    sandbox
      .stub(PrimaryListingDao, 'searchSimilarityReferral')
      .callsFake((): Object => similarityReferralSolrResponse);

    const service = new SimilarListingService(
      PrimaryListingDao,
      secondaryListingDao,
      UsersDao
    );

    const result = await service.searchSimilarityReferralById(
      '783355',
      675000000
    );
    return expect(result).to.deep.equal({
      totalCount: 1,
      items: [
        {
          channels: ['new'],
          kind: 'property',
          id: 'nps1380',
          shareLink:
            'localhost/perumahan-baru/properti/depok/female-apartment/nps1380?referralCode=JFKY1WK1',
          title: 'Female Apartment',
          subtitle:
            'He first concept Luxurious and Exclusively Apartment for women',
          tier: 1,
          propertyType: 'Apartemen',
          color: '#00ffe3',
          prices: [
            {
              type: 'new',
              currency: 'IDR',
              min: 635000000,
              max: 635000000,
            },
          ],
          cover: {
            type: 'image',
            urlTemplate:
              'https://img.rea-asia.com/rumah123/premium/${width}x${height}-${scale}/primary_property/project/1380/1522049399_background_1380.jpg', // eslint-disable-line no-template-curly-in-string
          },
          medias: [
            {
              type: 'image',
              urlTemplate:
                'https://img.rea-asia.com/rumah123/premium/${width}x${height}-${scale}/primary_property/project/1380/1522049399_background_1380.jpg', // eslint-disable-line no-template-curly-in-string
              description: 'Female Apartment',
            },
            {
              type: 'image',
              urlTemplate:
                'https://img.rea-asia.com/rumah123/premium/${width}x${height}-${scale}/primary_property/project/1380/1501560183_background_1380.jpg', // eslint-disable-line no-template-curly-in-string
              description: 'Female Apartment',
            },
          ],
          youtubeIds: [],
          floorPlanImages: [
            {
              type: 'image',
              urlTemplate:
                'https://img.rea-asia.com/rumah123/premium/${width}x${height}-${scale}/primary_property/project/1380/1522049502_siteplan_1380.jpg', // eslint-disable-line no-template-curly-in-string
              description: 'Female Apartment',
            },
            {
              type: 'image',
              urlTemplate:
                'https://img.rea-asia.com/rumah123/premium/${width}x${height}-${scale}/primary_property/project/1380/1495096759_591d5db2804f4floorplan_1730.jpg', // eslint-disable-line no-template-curly-in-string
              description: 'Female Apartemen(Type Azalea)',
            },
          ],
          logo: {
            type: 'image',
            url:
              'https://dm38pn59zg67e.cloudfront.net/1380/logo/logo-female-apartment-depok-indonesia-(8)-1483695357.jpg',
          },
          description:
            'Dengan mengusung konsep Safe, Secure, Comfort, dan Healthy, Female Apartement telah berkomitmen untuk membangun sebuah hunian yang aman, nyaman, dan sesuai dengan kebutuhan wanita masa kini. Berbagai fasilitas seperti kolam renang, salon, pusat kebugaran, laundry, TV kabel, dan internet akan tersedia untuk menunjang aktifitas Anda. Kami mengerti  bahwa keamanan dan kenyaman adalah hal terpenting bagi wanita, untuk itu sistem keamanan seperti access card, security 24 jam dan dilengkapi dengan cctv hampir tiap sudut akan membuat Anda beristirahat dengan tenang tanpa rasa khawatir. Raih kesempatan Anda, jangan lewatkan untuk memiliki hunian spesial kami.\n',
          updatedAt: '2017-01-11T12:00:00+07:00',
          address: {
            formattedAddress: 'Pangkalan Jati, Depok, Jawa Barat',
            lat: -6.321702,
            lng: 106.801646,
          },
          multilanguagePlace: {
            'en-GB': {
              level1: 'Jawa Barat',
              level2: 'Depok',
              level3: 'Pangkalan Jati',
            },
            'id-ID': {
              level1: 'Jawa Barat',
              level2: 'Depok',
              level3: 'Pangkalan Jati',
            },
            placeId: undefined,
          },
          active: true,
          website: '',
          attributes: {
            totalUnits: '1',
            builtUp: '0',
            carPark: '0',
            phoneLine: '0',
            electricity: '0',
            bathroom: '0',
            bedroom: '0',
            landArea: '0',
            completionDate: '03-2018',
          },
          organisations: [
            {
              id: 887,
              type: 'developer',
              name: 'PT Graha Loka Pangestu',
              logo: {
                type: 'image',
                url:
                  'https://dm38pn59zg67e.cloudfront.net/developer/logo/developer-logo-devoloper-glp-1487573786.png',
              },
              website:
                'localhost/properti-baru/developer/pt-graha-loka-pangestu/887',
              contact: {
                phones: [
                  {
                    label: 'LandLine',
                    number: '+628563531993',
                  },
                  {
                    label: 'Whatsapp',
                    number: '628563531993',
                  },
                ],
                emails: ['wanda.taula@yahoo.com', 'ecangkem@gmail.com'],
              },
              color: '#ffffff',
              address: {
                formattedAddress:
                  'Jln. 84f420718e no.584, Margonda, Depok, Jawa Barat',
              },
            },
          ],
          banner: {
            link: 'https://www.rumah123.com/kpr-mandiri',
            title: 'Simulasi KPR Mandiri',
          },
        },
      ],
    });
  });
});
