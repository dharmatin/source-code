/* eslint-disable */
import listingQueryBuilder from '../../src/helpers/listingQueryBuilder';
import constant from '../../src/config/constants';

describe('Listing Query Builder Helper', () => {
  const defaultSearchRequest = {
    body: {
      channels: ['new'],
      placeIds: [],
      places: [],
      sortBy: null,
      filters: {
        propertyTypes: [],
        bedroomRange: {},
        bathroomRange: {},
        priceRange: {
          min: null,
          max: null,
        },
        builtupSizeRange: {
          min: null,
          max: null,
        },
        landSizeRange: {
          min: null,
          max: null,
        },
        auction: false,
        transactedIncluded: false,
        isOwner: false,
      },
      customTexts: [],
    },
    query: {
      pageSize: 20,
      nextPageToken: '1',
    },
  };

  const defaultSort = {
    product_status: constant.SORTING.DESCENDING,
    is_premium: constant.SORTING.DESCENDING,
    score: constant.SORTING.DESCENDING,
  };

  it('Should return correct query with single place id', () => {
    const placeIds = ['abcd123'];
    const request = {
      ...defaultSearchRequest,
      body: {
        placeIds: placeIds,
      },
    };
    const expectedQuery = `
      (type:np AND status:Online AND -developer_company_id:0) AND 
      (((province_id:(abcd123) OR city_id:(abcd123) OR district_id:(abcd123))) OR (id:(abcd123)))
      `;
    const { q } = listingQueryBuilder(request);
    expect(q).to.equalIgnoreSpaces(expectedQuery);
  });

  it('Should return correct query with multiple place id', () => {
    const placeIds = ['abcd123', 'defg123'];
    const request = {
      ...defaultSearchRequest,
      body: {
        placeIds: placeIds,
      },
    };
    const expectedQuery = `
      (type:np AND status:Online AND -developer_company_id:0) AND 
      (((province_id:(abcd123 defg123) OR city_id:(abcd123 defg123) OR district_id:(abcd123 defg123))) OR (id:(abcd123 defg123)))
      `;
    const { q } = listingQueryBuilder(request);
    expect(q).to.equalIgnoreSpaces(expectedQuery);
  });

  it('Should return correct query with place level1', () => {
    const places = [{ level1: 'DKI Jakarta' }];
    const request = {
      ...defaultSearchRequest,
      body: {
        places: places,
      },
    };
    const expectedQuery = `
      (type:np AND status:Online AND -developer_company_id:0) AND 
      (province_name:("DKI Jakarta") AND city_name:(*) AND district_name:(*))
      `;
    const { q } = listingQueryBuilder(request);
    expect(q).to.equalIgnoreSpaces(expectedQuery);
  });

  it('Should return correct query with place level2', () => {
    const places = [{ level2: 'Jakarta Selatan' }];
    const request = {
      ...defaultSearchRequest,
      body: {
        places: places,
      },
    };
    const expectedQuery = `
      (type:np AND status:Online AND -developer_company_id:0) AND 
      (province_name:(*) AND city_name:("Jakarta Selatan") AND district_name:(*))
      `;
    const { q } = listingQueryBuilder(request);
    expect(q).to.equalIgnoreSpaces(expectedQuery);
  });

  it('Should return correct query with place level3', () => {
    const places = [{ level3: 'Kuningan' }];
    const request = {
      ...defaultSearchRequest,
      body: {
        places: places,
      },
    };
    const expectedQuery = `
      (type:np AND status:Online AND -developer_company_id:0) AND 
      (province_name:(*) AND city_name:(*) AND district_name:("Kuningan"))
      `;
    const { q } = listingQueryBuilder(request);
    expect(q).to.equalIgnoreSpaces(expectedQuery);
  });

  it('Should return correct query with bedroom filtered', () => {
    const request = {
      ...defaultSearchRequest,
      body: {
        filters: {
          bedroomRange: { min: 1 },
        },
      },
    };
    const expectedQuery = `
      (type:np AND status:Online AND -developer_company_id:0) AND bedroom_min:[1 TO *]
      `;
    const { q } = listingQueryBuilder(request);
    expect(q).to.equalIgnoreSpaces(expectedQuery);
  });

  it('Should return correct query with bathroom filtered', () => {
    const request = {
      ...defaultSearchRequest,
      body: {
        filters: {
          bathroomRange: { min: 1 },
        },
      },
    };
    const expectedQuery = `
      (type:np AND status:Online AND -developer_company_id:0) AND bathroom_min:[1 TO *]
      `;
    const { q } = listingQueryBuilder(request);
    expect(q).to.equalIgnoreSpaces(expectedQuery);
  });

  it('Should return correct query with minimum price filtered', () => {
    const request = {
      ...defaultSearchRequest,
      body: {
        filters: {
          priceRange: { min: '1000000', max: null },
        },
      },
    };
    const expectedQuery = `
      (type:np AND status:Online AND -developer_company_id:0) AND 
      (price_min_sort:[1000000 TO *]) OR (price_max_sort:[1000000 TO *])
      `;
    const { q } = listingQueryBuilder(request);
    expect(q).to.equalIgnoreSpaces(expectedQuery);
  });

  it('Should return correct query with maximum price filtered', () => {
    const request = {
      ...defaultSearchRequest,
      body: {
        filters: {
          priceRange: { min: null, max: '500000000' },
        },
      },
    };
    const expectedQuery = `
      (type:np AND status:Online AND -developer_company_id:0) AND 
      (price_min_sort:[* TO 500000000]) OR (price_max_sort:[* TO 500000000])
      `;
    const { q } = listingQueryBuilder(request);
    expect(q).to.equalIgnoreSpaces(expectedQuery);
  });

  it('Should return correct query with maximum and minimum price filtered', () => {
    const request = {
      ...defaultSearchRequest,
      body: {
        filters: {
          priceRange: { min: '100000000', max: '500000000' },
        },
      },
    };
    const expectedQuery = `
      (type:np AND status:Online AND -developer_company_id:0) 
      AND (price_min_sort:[100000000 TO *] AND price_min_sort:[* TO 500000000]) 
      OR (price_max_sort:[100000000 TO *] AND price_max_sort:[* TO 500000000])
      `;
    const { q } = listingQueryBuilder(request);
    expect(q).to.equalIgnoreSpaces(expectedQuery);
  });

  it('Should return correct query with minimum building size filtered', () => {
    const request = {
      ...defaultSearchRequest,
      body: {
        filters: {
          builtupSizeRange: { min: '100', max: null },
        },
      },
    };
    const expectedQuery = `
      (type:np AND status:Online AND -developer_company_id:0) AND building_size_min:[100 TO *]
      `;
    const { q } = listingQueryBuilder(request);
    expect(q).to.equalIgnoreSpaces(expectedQuery);
  });

  it('Should return correct query with maximum building size filtered', () => {
    const request = {
      ...defaultSearchRequest,
      body: {
        filters: {
          builtupSizeRange: { min: null, max: '1000' },
        },
      },
    };
    const expectedQuery = `
      (type:np AND status:Online AND -developer_company_id:0) AND building_size_max:[* TO 1000]
      `;
    const { q } = listingQueryBuilder(request);
    expect(q).to.equalIgnoreSpaces(expectedQuery);
  });

  it('Should return correct query with minimum and maximum building size filtered', () => {
    const request = {
      ...defaultSearchRequest,
      body: {
        filters: {
          builtupSizeRange: { min: '100', max: '1000' },
        },
      },
    };
    const expectedQuery = `
      (type:np AND status:Online AND -developer_company_id:0) AND 
      building_size_min:[100 TO *] AND building_size_max:[* TO 1000]
      `;
    const { q } = listingQueryBuilder(request);
    expect(q).to.equalIgnoreSpaces(expectedQuery);
  });

  it('Should return correct query with minimum land size filtered', () => {
    const request = {
      ...defaultSearchRequest,
      body: {
        filters: {
          landSizeRange: { min: '100', max: null },
        },
      },
    };
    const expectedQuery = `
      (type:np AND status:Online AND -developer_company_id:0) AND land_size_min:[100 TO *]
      `;
    const { q } = listingQueryBuilder(request);
    expect(q).to.equalIgnoreSpaces(expectedQuery);
  });

  it('Should return correct query with maximum land size filtered', () => {
    const request = {
      ...defaultSearchRequest,
      body: {
        filters: {
          landSizeRange: { min: null, max: '1000' },
        },
      },
    };
    const expectedQuery = `
      (type:np AND status:Online AND -developer_company_id:0) AND land_size_max:[* TO 1000]
      `;
    const { q } = listingQueryBuilder(request);
    expect(q).to.equalIgnoreSpaces(expectedQuery);
  });

  it('Should return correct query with minimum and maximum land size filtered', () => {
    const request = {
      ...defaultSearchRequest,
      body: {
        filters: {
          landSizeRange: { min: '100', max: '1000' },
        },
      },
    };
    const expectedQuery = `
      (type:np AND status:Online AND -developer_company_id:0) AND 
      land_size_min:[100 TO *] AND land_size_max:[* TO 1000]
      `;
    const { q } = listingQueryBuilder(request);
    expect(q).to.equalIgnoreSpaces(expectedQuery);
  });

  it('Should return correct query with custom text', () => {
    const request = {
      ...defaultSearchRequest,
      body: {
        customTexts: ['test'],
      },
    };
    const expectedQuery = `
      (type:np AND status:Online AND -developer_company_id:0) AND (project_name:(*test*) OR description:(*test*))
      `;
    const { q } = listingQueryBuilder(request);
    expect(q).to.equalIgnoreSpaces(expectedQuery);
  });

  it('Should return default sorting', () => {
    const { sort } = listingQueryBuilder(defaultSearchRequest);
    expect(sort).to.be.deep.equal(defaultSort);
  });

  it('Should return sort by price ascending', () => {
    const request = {
      ...defaultSearchRequest,
      body: { sortBy: 'price-asc' },
    };
    const { sort } = listingQueryBuilder(request);
    expect(sort).to.be.deep.equal({
      price_min_sort: constant.SORTING.ASCENDING,
      price_max_sort: constant.SORTING.ASCENDING,
    });
  });

  it('Should return sort by price descending', () => {
    const request = {
      ...defaultSearchRequest,
      body: { sortBy: 'price-desc' },
    };
    const { sort } = listingQueryBuilder(request);
    expect(sort).to.be.deep.equal({
      price_min_sort: constant.SORTING.DESCENDING,
      price_max_sort: constant.SORTING.DESCENDING,
    });
  });

  it('Should return sort by price descending', () => {
    const request = {
      ...defaultSearchRequest,
      body: { sortBy: 'price-desc' },
    };
    const { sort } = listingQueryBuilder(request);
    expect(sort).to.be.deep.equal({
      price_min_sort: constant.SORTING.DESCENDING,
      price_max_sort: constant.SORTING.DESCENDING,
    });
  });

  it('Should return sort by recent', () => {
    const request = {
      ...defaultSearchRequest,
      body: { sortBy: 'posted-desc' },
    };
    const { sort } = listingQueryBuilder(request);
    expect(sort).to.be.deep.equal({
      created_date: constant.SORTING.DESCENDING,
      created_date: constant.SORTING.DESCENDING,
    });
  });
});
