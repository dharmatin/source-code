// @flow
import _ from 'lodash';
import type {Amenity} from './types';

export const formatterMultiLanguageAmenities = (listing: Object, lang: string): Array<Amenity> => {
  if (listing.numFound > 0 && !_.isEmpty(listing.docs[0].en_project_access)) {
    return _.map(listing.docs[0].en_project_access, function(row) {
      let field = row.split(':');
      return {
        name: field[1],
        distance: field[2],
        poiCategoryName: field[0]
      };
    });
  } else {
    return [];
  }
};
