// @flow
import _ from 'lodash';
import config from '../../../config';
import {toISOFormatting} from '../../../libs/utility';
import type {ProjectProfilePage} from './types';
import type {Listing} from '../listingFormatter/types';
import * as priceFormatter from '../listingPriceFormatter';
import * as listingFormatter from '../listingFormatter';
import * as addressFormatter from '../addressFormatter';
import * as mediaFormatter from '../mediaFormatter';
import * as listingAttributeFormatter from '../listingAttributeFormatter';
import * as organisationFormatter from '../organisationFormatter';

export const getProjectProfileFormatter = (projectListing: Object, childListings: Object, lang: string): ProjectProfilePage => {
  if (projectListing.numFound === 0) {
    return {};
  } else {
    return _.merge({}, 
      formatterProject(projectListing.docs[0], lang), 
      {properties: formatterChildListing(childListings.docs, lang)} 
    );
  }
};

const formatterProject = (projectProfilePage: Object, lang: string): Listing => {
  const response = {};
  const featureDescription = projectProfilePage[lang + '_key_point'];
  response.channels = ['new'];

  const banner = listingFormatter.getBannerSponsorship({
    link: projectProfilePage.url_sponsor,
    title: projectProfilePage['sponsor_name_' + lang]
  });

  if (!_.isEmpty(banner)) {
    response.banner = banner;
  }

  response.cover = mediaFormatter.getImageCover(JSON.parse(projectProfilePage.image)[0]);
  response.description = projectProfilePage.description;

  if (!_.isEmpty(projectProfilePage.project_brandcolor)) {
    response.color = projectProfilePage.project_brandcolor;
  }

  response.id = projectProfilePage.id;
  response.title = projectProfilePage.project_name;
  response.subtitle = projectProfilePage.tagline;
  response.propertyType = listingFormatter.getPropertyType(projectProfilePage.subtype);
  response.address = addressFormatter.formatterAddressInfo({
    district: projectProfilePage.district_name,
    city: projectProfilePage.city_name,
    province: projectProfilePage.province_name,
    geoCoordinate: _.split(projectProfilePage.latlng, ',')
  });
  response.attributes = listingAttributeFormatter.formatterAttributesInfo({
    totalUnits: projectProfilePage.qty_unit,
    completionDate: projectProfilePage.completion_date,
    architectName: projectProfilePage.architect_name,
    contractorName: projectProfilePage.contractor_name,
    promotion: projectProfilePage.project_quote,
    downloadURL: (!_.isEmpty(projectProfilePage.attachment) ? JSON.parse(projectProfilePage.attachment)[0] : '')
  });

  // response.listers = {};
  response.logo = mediaFormatter.getLogo(JSON.parse(projectProfilePage.logo)[0], config.image.baseUrl);
  response.multilanguagePlace = addressFormatter.formatterMultiLanguageAddressInfo({
    district: projectProfilePage.district_name,
    city: projectProfilePage.city_name,
    province: projectProfilePage.province_name
  });

  response.organisations = organisationFormatter.getDeveloperInfo({
    id: projectProfilePage.developer_company_id,
    name: projectProfilePage.developer_name,
    color: projectProfilePage.developer_brandcolor,
    email: projectProfilePage.ads_email,
    additionalEmail: projectProfilePage.ads_email2,
    mainContact: projectProfilePage.ads_contact,
    secondaryContact: projectProfilePage.ads_contact2,
    whatsapp: projectProfilePage.project_whatsapp,
    city: projectProfilePage.developer_city,
    province: projectProfilePage.developer_province,
    district: projectProfilePage.developer_district,
    address: projectProfilePage.developer_address,
    logo: projectProfilePage.developer_logo
  }, lang);

  response.prices = priceFormatter.getPrices({
    priceMin: projectProfilePage.price_min,
    priceMax: projectProfilePage.price_max
  });

  response.shareLink = listingFormatter.getProjectProfilePageLink({
    projectName: projectProfilePage.project_name,
    city: projectProfilePage.city_name,
    id: projectProfilePage.id
  }, lang);
  response.tier = listingFormatter.getTierOfPrimaryListing(projectProfilePage.is_premium, projectProfilePage.is_gts);
  response.updatedAt = toISOFormatting(projectProfilePage.updated_date);
  response.medias = mediaFormatter.getListingImages(projectProfilePage.all_listing_images);

  const youtubeIds = mediaFormatter.getYoutubeIds(projectProfilePage.all_video);
  if (!_.isEmpty(youtubeIds)) {
    response.youtubeIds = youtubeIds;
  }

  if (!_.isEmpty(featureDescription)) {
    const formattedDescriptions = _.map(featureDescription, desc => {
      const descriptions = _.split(desc, ':');
      return `<b>${descriptions[0]}</b><p>${descriptions[1]}</p>`;
    }).join('</br></br>');

    response.featureDescription = formattedDescriptions;
  }

  if (!_.isEmpty(projectProfilePage.website)) {
    response.website = projectProfilePage.website;
  }

  const image360s = mediaFormatter.getThreeSixtyVideos(projectProfilePage.all_360_video);
  if (!_.isEmpty(image360s)) {
    response.image360s = image360s;
  }

  response.floorPlanImages = mediaFormatter.getFloorPlanImages(projectProfilePage.all_image_floorplan);
  response.features = listingFormatter.getFeatures(projectProfilePage[lang + '_project_facilities']);
  return response;
};

const formatterChildListing = (childListings: Array<Object>, lang: string): Array<Listing> => {
  let listings = [];
  _.map(childListings, listing => {
    const dataListing = {};
    dataListing.price = priceFormatter.getPrice({
      priceMin: listing.price_sort,
      priceMax: listing.price_sort
    });
    dataListing.attributes = listingAttributeFormatter.formatterAttributesInfo({
      internet: listing.conectivity,
      landArea: listing.land_size,
      builtUp: listing.building_size,
      bedroom: listing.bedroom,
      bathroom: listing.bathroom,
      electricity: listing.electricity,
      phoneLine: listing.phoneline
      //numberSeparator: config.separator.number[lang]
    });
    dataListing.id = listing.id;
    dataListing.title = listing.subproject_name;
    dataListing.subtitle = listing.tagline;
    dataListing.description = _.join(JSON.parse(listing.description), '\n');
    dataListing.medias = mediaFormatter.getListingImages(listing.listing_images_ar);
    listings.push(dataListing);
  });
  return listings;
};
