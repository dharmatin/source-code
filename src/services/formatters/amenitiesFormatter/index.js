// @flow
import _ from 'lodash';
import type {Amenities} from './types';

export const formatterMultiLanguageAmenities = (listing: Object, lang: string): Array<Amenities> => {
  if(listing.numFound > 0 && !_.isEmpty(listing.docs[0].en_project_access)){
    const projectAccess = listing.docs[0].en_project_access;
    return projectAccess.map(function(row){
      let field = row.split(':');
      return {
        name: field[1],
        distance: field[2],
        poiCategoryName: field[0]
      }
    });
  }else{
    return {}
  }
};