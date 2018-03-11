import chai from 'chai';
import sinon from 'sinon';
import chaiAsPromised from 'chai-as-promised';
import sinonChai from 'sinon-chai';

import daoListing from '../../src/dao/listings';
import { ListingService } from '../../src/services/projectProfileService';

chai.use(chaiAsPromised);
chai.use(sinonChai);
const {expect} = chai;
const sandbox = sinon.createSandbox();

describe('Response Amenities Service', () => {

  afterEach(() => {
    sandbox.restore();
  });

  describe('#getAmenitiesById', () => {
    it('Should be return array object', async () => {
    
      const formatResponse = {
        responseHeader: {status: 0},
        response: {
          numFound: 1, 
          docs:[
            {
              'en_project_access':[
                'School:Sekolah, ST paulus:5 KM',
                'Shopping Mall:Pasar kaget:2 KM',
                'Train Station:Gondangdia:2 KM',
                'School:MIT :10 KM',
                'School:SMP 77:6 KM',
                'Train Station:Manggarai:4 KM'
              ]
            }
          ]
        },
      }

      sandbox.stub(daoListing, 'searchProjectAccessByProjectId').callsFake(() => formatResponse);
      const projectProfile = new ListingService(daoListing);
      const result = await projectProfile.getAmenitiesById('nps1091', 'en');

      expect(result).to.be.an('array')
      expect(result[0]).to.have.property('name');
      expect(result[0]).to.have.property('distance');
      expect(result[0]).to.have.property('poiCategoryName');
      
    });

    it('Should throw error when data not found', () => {

      sandbox.stub(daoListing, 'searchProjectAccessByProjectId').callsFake(() => ({responseHeader: {status: 1}}));
      const projectProfile = new ListingService(daoListing);
      const result = projectProfile.getAmenitiesById('nps1091', 'en');

      expect(result).to.be.eventually.rejectedWith('Solr get amenities not found').and.be.an.instanceOf(Error);

    });
  });

});
