// @flow
import _ from 'lodash';
import type { Amenity } from './types';

export const formatMultiLanguageAmenities = (
  listing: Object,
  lang: string
): Array<Amenity> => {
  if (listing.numFound > 0) {
    const projectAccess =
      lang == 'en'
        ? listing.docs[0].en_project_access
        : listing.docs[0].id_project_access;
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
