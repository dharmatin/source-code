/* eslint-disable */
import { makeQuery, buildFilterQuery } from '../../src/dao/search';

describe('Search Listings', () => {
  describe('Query search by placeIds', () => {
    it('Should be return query without developer', () => {
      const query = `
        (type:np AND status:Online AND -developer_company_id:0)
        AND (((province_id:(5f2b9323c39ee3c861a7b382d205c3d3 53453c482d4d75c2fcc000cda7f2dd81)
        OR city_id:(5f2b9323c39ee3c861a7b382d205c3d3 53453c482d4d75c2fcc000cda7f2dd81)
        OR district_id:(5f2b9323c39ee3c861a7b382d205c3d3 53453c482d4d75c2fcc000cda7f2dd81)))
        OR (id:(5f2b9323c39ee3c861a7b382d205c3d3 53453c482d4d75c2fcc000cda7f2dd81)))`;
      const request = {
        channels: ['new'],
        placeIds: [
          '5f2b9323c39ee3c861a7b382d205c3d3',
          '53453c482d4d75c2fcc000cda7f2dd81',
        ],
        customTexts: [],
        places: [],
      };
      expect(makeQuery(request)).to.equalIgnoreSpaces(query);
    });
    it('Should be return query with developer', () => {
      const query = `
        (type:np AND status:Online AND -developer_company_id:0) AND
        (((province_id:(775 727) OR city_id:(775 727) OR district_id:(775 727))) OR
        (developer_company_id:(775 727)) OR (id:(775 727)))`;
      const request = {
        channels: ['new'],
        placeIds: ['775', '727'],
        customTexts: [],
        places: [],
      };
      expect(makeQuery(request)).to.equalIgnoreSpaces(query);
    });
  });
  describe('Query By Custom Texts', () => {
    it('Should be return query by custom text parameters', () => {
      const customTextQuery = `
        (type:np AND status:Online AND -developer_company_id:0)
        AND (project_name:(*verdura* OR *project*mantap*) 
        OR description:(*verdura* OR *project*mantap*))
      `;
      const request = {
        channels: ['new'],
        placeIds: [],
        customTexts: ['verdura', 'project mantap'],
        places: [],
      };
      expect(makeQuery(request)).to.equalIgnoreSpaces(customTextQuery);
    });
  });

  describe('Query By Place', () => {
    it('Should be return query by place parameters', () => {
      const query = `
        (type:np AND status:Online AND -developer_company_id:0) 
        AND (province_name:("Jawa Barat" OR "Jawa Barat") 
        AND city_name:("Bogor" OR "Bekasi") 
        AND district_name:("Sentul" OR "Tambun"))
      `;
      const request = {
        channels: ['new'],
        placeIds: [],
        customTexts: [],
        places: [
          {
            level1: 'Jawa Barat',
            level2: 'Bogor',
            level3: 'Sentul',
          },
          {
            level1: 'Jawa Barat',
            level2: 'Bekasi',
            level3: 'Tambun',
          },
        ],
      };
      expect(makeQuery(request)).to.equalIgnoreSpaces(query);
    });
    it('Should be return query by place and custom text', () => {
      const query = `
        (type:np AND status:Online AND -developer_company_id:0) 
        AND (project_name:(*verdura*) OR description:(*verdura*))
        AND (province_name:("Jawa Barat") 
        AND city_name:("Bogor") 
        AND district_name:("Sentul"))
      `;
      const request = {
        channels: ['new'],
        placeIds: [],
        customTexts: ['verdura'],
        places: [
          {
            level1: 'Jawa Barat',
            level2: 'Bogor',
            level3: 'Sentul',
          },
        ],
      };
      expect(makeQuery(request)).to.equalIgnoreSpaces(query);
    });
  });

  describe('Default Query', () => {
    it('Shold return default query', () => {
      const defaultQuery = `
        (type:np AND status:Online AND -developer_company_id:0)`;
      const body = {
        channels: ['new'],
        placeIds: [],
        customTexts: [],
        places: [],
      };
      expect(makeQuery(body)).to.equalIgnoreSpaces(defaultQuery);
    });
  });

  describe('Filter query', () => {
    it('Should return query with filters parameter', () => {
      const request = {
        filters: {
          builtupSizeRange: {
            min: '10',
            max: '1000',
          },
          landSizeRange: {
            min: '10',
            max: '1000',
          },
          bedroomRange: {
            min: '10',
            max: '1000',
          },
          bathroomRange: {
            min: '10',
            max: '1000',
          },
        },
      };
      const query =
        'building_size: [10 TO 1000] AND land_size: [10 TO 1000] AND bedroom: [10 TO 1000] AND bathroom: [10 TO 1000]';
      expect(buildFilterQuery({ body: request })).to.equalIgnoreSpaces(query);
    });
  });
});
