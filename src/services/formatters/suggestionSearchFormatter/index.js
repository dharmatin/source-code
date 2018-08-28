// @flow
import _ from 'lodash';
import constant from '../../../config/constants';
import config from '../../../config';

const {
  LOCATION_LEVEL: { TITLE, PROVINCE, CITY, DISTRICT },
  NEWLAUNCH: { DEVELOPMENT, DEVELOPER, UNIT },
} = constant;

export default class SuggestionSearchFormatter {
  multilanguagesPlaceFormat = ({ level1, level2, level3 }: string): Object => ({
    'en-GB': {
      level1,
      level2,
      level3,
    },
    'id-ID': {
      level1,
      level2,
      level3,
    },
  });

  formatLocationLevel = ({ provinces, cities, district }: Object): Object => {
    const province = _.map(provinces, (item: string): Object => {
      const { province_name, province_id } = item;
      return {
        id: province_id,
        type: TITLE,
        title: province_name,
        subtitle: PROVINCE,
        label: config.translator.location,
        multilanguagePlace: this.multilanguagesPlaceFormat({
          level1: province_name,
        }),
      };
    });

    const city = _.map(cities, (item: string): Object => {
      const { province_name, city_name, city_province, city_id } = item;
      return {
        id: city_id,
        type: TITLE,
        title: city_province,
        subtitle: CITY,
        label: config.translator.location,
        multilanguagePlace: this.multilanguagesPlaceFormat({
          level1: province_name,
          level2: city_name,
        }),
      };
    });

    const districts = _.map(district, (item: string): Object => {
      const {
        district_city,
        district_id,
        province_name,
        city_name,
        district_name,
      } = item;
      return {
        id: district_id,
        type: TITLE,
        title: district_city,
        subtitle: DISTRICT,
        label: config.translator.location,
        multilanguagePlace: this.multilanguagesPlaceFormat({
          level1: province_name,
          level2: city_name,
          level3: district_name,
        }),
      };
    });

    return [...province, ...city, ...districts];
  };

  formatDeveloper = ({ developer }: Array): Object => {
    const developers = _.map(developer, (item: string): Object => {
      const {
        id,
        developer_name,
        province_name,
        city_name,
        district_name,
      } = item;
      return {
        id: id,
        type: DEVELOPER,
        title: developer_name,
        label: config.translator.developer,
        multilanguagePlace: this.multilanguagesPlaceFormat({
          level1: province_name,
          level2: city_name,
          level3: district_name,
        }),
      };
    });

    return [...developers];
  };

  formatDevelopment = ({ development }: Array): Object => {
    const developments = _.map(development, (item: string): Object => {
      const {
        developer_company_id,
        project_name,
        province_name,
        city_name,
        district_name,
      } = item;
      return {
        id: developer_company_id,
        type: DEVELOPMENT,
        title: project_name,
        label: config.translator.development,
        multilanguagePlace: this.multilanguagesPlaceFormat({
          level1: province_name,
          level2: city_name,
          level3: district_name,
        }),
      };
    });

    return [...developments];
  };

  formatSubUnit = ({ subunit }: Array): Object => {
    const subUnit = _.map(subunit, (item: string): Object => {
      const {
        id,
        subproject_name: subProjectName,
        tagline,
        project_category,
        province_name,
        city_name,
        district_name,
      } = item;
      return {
        id: id,
        type: UNIT,
        title: `${subProjectName} - ${tagline}`,
        subtitle: project_category,
        label: config.translator.unit,
        multilanguagePlace: this.multilanguagesPlaceFormat({
          level1: province_name,
          level2: city_name,
          level3: district_name,
        }),
      };
    });

    return [...subUnit];
  };
}
