// @flow
import { expect } from 'chai';
import Formatter from '../../src/services/formatters/suggestionSearchFormatter';

declare var describe: any;
declare var it: any;

describe('Suggestion Response', () => {
  it('#Format location province', () => {
    const request = {
      provinces: [
        {
          province_name: 'DKI Jakarta',
          province_id: '1',
          city_name: 'test',
          district_name: 'test2',
        },
      ],
      cities: [
        {
          province_name: 'DKI Jakarta',
          province_id: '1',
          city_name: 'test',
          district_name: 'test2',
          city_id: '2',
          city_province: 'cp',
        },
      ],
      district: [
        {
          district_id: '3',
          province_name: 'DKI Jakarta',
          province_id: '1',
          city_name: 'test',
          district_name: 'test2',
          district_city: 'dc',
        },
      ],
    };

    const response = new Formatter().formatLocationLevel(request);
    expect(response).to.deep.equal([
      {
        id: '1',
        label: 'Lokasi',
        multilanguagePlace: {
          'en-GB': {
            level1: 'DKI Jakarta',
            level2: undefined,
            level3: undefined,
          },
          'id-ID': {
            level1: 'DKI Jakarta',
            level2: undefined,
            level3: undefined,
          },
        },
        subtitle: 'province',
        title: 'DKI Jakarta',
        type: 'location',
      },
      {
        id: '2',
        label: 'Lokasi',
        multilanguagePlace: {
          'en-GB': {
            level1: 'DKI Jakarta',
            level2: 'test',
            level3: undefined,
          },
          'id-ID': {
            level1: 'DKI Jakarta',
            level2: 'test',
            level3: undefined,
          },
        },
        subtitle: 'city',
        title: 'cp',
        type: 'location',
      },
      {
        id: '3',
        label: 'Lokasi',
        multilanguagePlace: {
          'en-GB': {
            level1: 'DKI Jakarta',
            level2: 'test',
            level3: 'test2',
          },
          'id-ID': {
            level1: 'DKI Jakarta',
            level2: 'test',
            level3: 'test2',
          },
        },
        subtitle: 'district',
        title: 'dc',
        type: 'location',
      },
    ]);
  });

  it('#Format Developer', () => {
    const request = {
      developer: [
        {
          province_name: 'DKI Jakarta',
          province_id: '1',
          city_name: 'test',
          district_name: 'test2',
          id: '11',
          developer_name: 'dev name',
        },
      ],
    };

    const response = new Formatter().formatDeveloper(request);
    expect(response).to.deep.equal([
      {
        id: '11',
        label: 'Pengembang',
        multilanguagePlace: {
          'en-GB': {
            level1: 'DKI Jakarta',
            level2: 'test',
            level3: 'test2',
          },
          'id-ID': {
            level1: 'DKI Jakarta',
            level2: 'test',
            level3: 'test2',
          },
        },
        title: 'dev name',
        type: 'developer',
      },
    ]);
  });

  it('#Format Development', () => {
    const request = {
      development: [
        {
          province_name: 'DKI Jakarta',
          province_id: '1',
          city_name: 'test',
          district_name: 'test2',
          id: '11',
          project_name: 'development name',
        },
      ],
    };

    const response = new Formatter().formatDevelopment(request);
    expect(response).to.deep.equal([
      {
        id: '11',
        label: 'Proyek',
        multilanguagePlace: {
          'en-GB': {
            level1: 'DKI Jakarta',
            level2: 'test',
            level3: 'test2',
          },
          'id-ID': {
            level1: 'DKI Jakarta',
            level2: 'test',
            level3: 'test2',
          },
        },
        title: 'development name',
        type: 'development',
      },
    ]);
  });

  it('#Format Sub Unit', () => {
    const request = {
      subunit: [
        {
          province_name: 'DKI Jakarta',
          province_id: '1',
          city_name: 'test',
          district_name: 'test2',
          parent_id: '11',
          subproject_name: 'subname',
          tagline: 'tagline',
          project_category: 'tower',
        },
      ],
    };

    const response = new Formatter().formatSubUnit(request);
    expect(response).to.deep.equal([
      {
        id: '11',
        label: 'Unit',
        subtitle: 'tower',
        multilanguagePlace: {
          'en-GB': {
            level1: 'DKI Jakarta',
            level2: 'test',
            level3: 'test2',
          },
          'id-ID': {
            level1: 'DKI Jakarta',
            level2: 'test',
            level3: 'test2',
          },
        },
        title: 'subname - tagline',
        type: 'unit',
      },
    ]);
  });
});
