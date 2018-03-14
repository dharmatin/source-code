// @flow
import _ from 'lodash';
import config from '../../../config';
import { toISOFormatting } from '../../../libs/utility';
import type { SuggestionProject } from './types';
import type { Listing } from '../listingFormatter/types';
import * as priceFormatter from '../listingPriceFormatter';
import * as listingFormatter from '../listingFormatter';
import * as addressFormatter from '../addressFormatter';
import * as mediaFormatter from '../mediaFormatter';
import * as listingAttributeFormatter from '../listingAttributeFormatter';
import * as organisationFormatter from '../organisationFormatter';

export const formatSuggestionProjects = (
  projectListing: Object
): SuggestionProject => {
  if (projectListing.numFound === 0) {
    return {};
  } else {
    return {
      items: formatRelatedProjects(projectListing.docs),
    };
  }
};

const formatRelatedProjects = (
  projectListings: Array<Object>
): Array<Listing> => {
  let listings = [];
  _.map(projectListings, listing => {
    const dataListing = {};

    dataListing.id = listing.id;
    dataListing.title = listing.project_name;
    dataListing.channels = ['new'];
    dataListing.tier = listingFormatter.formatTierOfPrimaryListing(
      listing.is_premium,
      listing.is_gts
    );
    dataListing.shareLink = listingFormatter.formatProjectProfilePageLink(
      {
        projectName: listing.project_name,
        city: listing.city_name,
        id: listing.id,
      }
    );
    dataListing.description = listing.description;
    dataListing.cover = mediaFormatter.formatImageCover(
      JSON.parse(listing.image)[0]
    );
    dataListing.logo = mediaFormatter.formatLogo(
      JSON.parse(listing.logo)[0],
      config.image.baseUrl
    );
    dataListing.multilanguagePlace = addressFormatter.formatMultiLanguageAddressInfo(
      {
        district: listing.district_name,
        city: listing.city_name,
        province: listing.province_name,
      }
    );
    dataListing.prices = priceFormatter.formatPrices({
      priceMin: listing.price_min,
      priceMax: listing.price_max,
    });

    dataListing.address = addressFormatter.formatAddressInfo({
      district: listing.district_name,
      city: listing.city_name,
      province: listing.province_name,
      geoCoordinate: _.split(listing.latlng, ','),
    });

    dataListing.organisations = organisationFormatter.formatDeveloperInfo(
      {
        id: listing.developer_company_id,
        name: listing.developer_name,
        color: listing.developer_brandcolor,
        email: listing.ads_email,
        additionalEmail: listing.ads_email2,
        mainContact: listing.ads_contact,
        secondaryContact: listing.ads_contact2,
        whatsapp: listing.project_whatsapp,
        city: listing.developer_city,
        province: listing.developer_province,
        district: listing.developer_district,
        address: listing.developer_address,
        logo: listing.developer_logo,
      }
    );

    dataListing.attributes = listingAttributeFormatter.formatAttributesInfo({
      landArea: listing.land_size,
      builtUpMin: listing.building_size_min,
      builtUpMax: listing.building_size_max,
      landAreaMin: listing.land_size_min,
      landAreaMax: listing.land_size_max
    });

    listings.push(dataListing);
  });
  return listings;
};
