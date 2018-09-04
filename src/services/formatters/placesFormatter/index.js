// @flow
import _ from 'lodash';
import { parse } from 'url';
import type { ExplorePopularLocation, coverImage } from './types';
import { isJson, slugify } from '../../../libs/utility';
import config from '../../../config';

export default class PlacesFormatter {
  formatExplorePopularLocation = (popularLocation: Object): Object => {
    const filteredLocations = _.filter(
      popularLocation,
      (item: Object): boolean => isJson(item.landing_page)
    );
    return _.map(filteredLocations, (item: Object): ExplorePopularLocation => {
      const {
        province_name: province,
        city_name: city,
        district_name: district,
      } = JSON.parse(item.landing_page);

      return _.pickBy(
        {
          level1: province,
          level2: city,
          level3: district,
          slugId: this.createSlugId(province, city, district),
          cover: this.formatImageCover(item.image),
        },
        (item: any): boolean => !_.isUndefined(item)
      );
    });
  };

  createSlugId = (...locations: Array<string>): string => {
    return slugify(_.join(_.compact(locations), '_'));
  };

  formatImageCover = (url: string): coverImage => {
    const parsedUrl: Object = !_.isUndefined(parse(url)) ?
      parse(url) :
      { pathname: '' };
    return {
      urlTemplate: `${
        config.image.sharpieUrl
      }/premium/\${width}x\${height}-\${scale}${parsedUrl.pathname}`,
      url: parsedUrl.pathname,
    };
  };
}
