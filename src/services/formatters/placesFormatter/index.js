// @flow
import _ from 'lodash';
import type { ExplorePopularLocation } from './types';

export default class PlacesFormatter {
  formatExplorePopularLocation = (popularLocation: Object): Object => {
    return _.map(popularLocation, (item: Object): ExplorePopularLocation => ({
      level1: '',
      level2: '',
      level3: '',
      slugId: '',
      cover: {
        url: item.image,
      },
    }));
  };
}
