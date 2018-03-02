// @flow
import _ from 'lodash';
import * as projectFormatter from './projectFormatter';

export const getChildListingsInfo = (childListings: Array<Object>, lang: string) => {
  /*const listings = [];
  const itemListing = {};
  _.map(childListings, (listing) => {
    _.merge(itemListing,
      projectFormatter.getGeneralInfo({
        id: listing.id,
        title: listing.tagline,
        projectName: listing.project_name,
        description: listing.description,
        companyId: listing.developer_company_id,
        propertyType: listing.property_type,
        updatedAt: listing.updated_date,
        city: listing.city_name,
        website: listing.website,
      })
    );
    listings.push(itemListing);
    //console.log(listing);
  });

  return {listings: listings}; */
};
