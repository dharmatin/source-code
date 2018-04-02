// @flow
import _ from 'lodash';
import config from '../../../config';
import type { SuggestionProject } from './types';
import * as priceFormatter from '../listingPriceFormatter';
import * as listingFormatter from '../listingFormatter';
import * as addressFormatter from '../addressFormatter';
import * as mediaFormatter from '../mediaFormatter';
import * as listingAttributeFormatter from '../listingAttributeFormatter';
import * as organisationFormatter from '../organisationFormatter';

export const formatSuggestionProjects = (
  projectListing: Object,
  pagingRequest: Object
): SuggestionProject => {
  if (projectListing.numFound === 0) {
    return {};
  } else if (projectListing.docs.length === 0) {
    return {
      totalCount: 0,
    };
  } else {
    return formatRelatedProjects(
      projectListing.docs,
      projectListing.numFound,
      pagingRequest
    );
  }
};

const formatRelatedProjects = (
  projectListings: Array<Object>,
  totalNumber: number,
  pagingRequest: Object
): SuggestionProject => {
  let response = {};
  let listings = [];
  _.map(projectListings, (listing: Object) => {
    const dataListing = {};

    dataListing.id = listing.id;
    dataListing.title = listing.project_name;
    dataListing.channels = ['new'];
    dataListing.tier = listingFormatter.formatTierOfPrimaryListing(
      listing.is_premium,
      listing.is_gts
    );
    dataListing.shareLink = listingFormatter.formatProjectProfilePageLink({
      projectName: listing.project_name,
      city: listing.city_name,
      id: listing.id,
    });
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

    dataListing.organisations = organisationFormatter.formatDeveloperInfo({
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
    });

    dataListing.propertyType = listingFormatter.formatPropertyType(
      listing.subtype
    );

    const attributes = listingAttributeFormatter.formatAttributesInfo({
      landArea: listing.land_size,
      builtUpMin: listing.building_size_min,
      builtUpMax: listing.building_size_max,
      landAreaMin: listing.land_size_min,
      landAreaMax: listing.land_size_max,
    });

    if (!_.isEmpty(attributes)) {
      dataListing.attributes = attributes;
    }

    listings.push(dataListing);
  });
  response.items = listings;
  response.totalCount = totalNumber;

  if (
    pagingRequest.pageToken * pagingRequest.pageSize < totalNumber &&
    totalNumber > 1
  ) {
    response.nextPageToken = (pagingRequest.pageToken + 1).toString();
  }
  return response;
};
