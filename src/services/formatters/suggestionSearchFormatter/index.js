// @flow
import _ from 'lodash';
import constant from '../../../config/constants';
import config from '../../../config';

export default class SuggestionSearchFormatter {
  formatLocationLevel = (params: Array): Object => {
    const provinces = _.map(params[0], (item: string): Object => ({
      id: '',
      type: constant.LOCATION_LEVEL.TITLE,
      title: item.province_name,
      subtitle: constant.LOCATION_LEVEL.PROVINCE,
      label: config.translator.location,
      multilanguagePlace: {
        'en-GB': {
          level1: item.province_name,
        },
        'id-ID': {
          level1: item.province_name,
        },
      },
    }));

    const cities = _.map(params[1], (item: string): Object => ({
      id: '',
      type: constant.LOCATION_LEVEL.TITLE,
      title: item.city_province,
      subtitle: constant.LOCATION_LEVEL.CITY,
      label: config.translator.location,
      multilanguagePlace: {
        'en-GB': {
          level1: item.province_name,
          level2: item.city_name,
        },
        'id-ID': {
          level1: item.province_name,
          level2: item.city_name,
        },
      },
    }));

    const district = _.map(params[2], (item: string): Object => ({
      id: '',
      type: constant.LOCATION_LEVEL.TITLE,
      title: item.district_city,
      subtitle: constant.LOCATION_LEVEL.DISTRICT,
      label: config.translator.location,
      multilanguagePlace: {
        'en-GB': {
          level1: item.province_name,
          level2: item.city_name,
          level3: item.district_name,
        },
        'id-ID': {
          level1: item.province_name,
          level2: item.city_name,
          level3: item.district_name,
        },
      },
    }));

    return [...provinces, ...cities, ...district];
  };

  formatDeveloper = (params: Array): Object => {
    const developer = _.map(params[3], (item: string): Object => ({
      id: item.id,
      type: 'developer',
      title: item.developer_name,
      label: config.translator.developer,
      multilanguagePlace: {
        'en-GB': {
          level1: item.province_name,
          level2: item.city_name,
          level3: item.district_name,
        },
        'id-ID': {
          level1: item.province_name,
          level2: item.city_name,
          level3: item.district_name,
        },
      },
    }));

    return [...developer];
  };

  formatDevelopment = (params: Array): Object => {
    const development = _.map(params[4], (item: string): Object => ({
      id: item.developer_company_id,
      type: 'development',
      title: item.project_name,
      label: config.translator.development,
      multilanguagePlace: {
        'en-GB': {
          level1: item.province_name,
          level2: item.city_name,
          level3: item.district_name,
        },
        'id-ID': {
          level1: item.province_name,
          level2: item.city_name,
          level3: item.district_name,
        },
      },
    }));

    return [...development];
  };

  formatSubUnit = (params: Array): Object => {
    const subUnit = _.map(params[5], (item: string): Object => ({
      id: item.parent_id,
      type: 'unit',
      title: `${item.subproject_name} - ${item.tagline}`,
      subtitle: item.project_category,
      label: config.translator.unit,
      multilanguagePlace: {
        'en-GB': {
          level1: item.province_name,
          level2: item.city_name,
          level3: item.district_name,
        },
        'id-ID': {
          level1: item.province_name,
          level2: item.city_name,
          level3: item.district_name,
        },
      },
    }));

    return [...subUnit];
  };
}
