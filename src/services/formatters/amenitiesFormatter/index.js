// @flow
import _ from 'lodash';
import type { Amenity } from './types';
import config from '../../../config';

export const formatMultiLanguageAmenities = (
  listing: Object
): Array<Amenity> => {
  if (listing.numFound > 0) {
    const projectAccess = listing.docs[0][config.lang + '_project_access'];

    return _.map(projectAccess, function(row): Object {
      let field = row.split(':');
      return {
        name: field[1],
        distance: field[2],
        poiCategoryName: field[0],
      };
    });
  } else {
    return [];
  }
};
