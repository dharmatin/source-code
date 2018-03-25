// @flow
import _ from 'lodash';
import config from '../../../config';
import { toISOFormatting } from '../../../libs/utility';
import moment from 'moment';
import type { ProjectProfilePage } from './types';
import type { Listing } from '../listingFormatter/types';
import * as priceFormatter from '../listingPriceFormatter';
import * as listingFormatter from '../listingFormatter';
import * as addressFormatter from '../addressFormatter';
import * as mediaFormatter from '../mediaFormatter';
import * as listingAttributeFormatter from '../listingAttributeFormatter';
import * as organisationFormatter from '../organisationFormatter';

export const formatProjectProfile = (
  projectListing: Object,
  childListings: Object,
  lister: Object
): ProjectProfilePage => {
  if (!_.isEmpty(projectListing)) {
    return _.merge({}, formatProject(projectListing.docs[0], lister), {
      properties: formatChildListing(childListings.docs),
    });
  } else {
    return {};
  }
};

const formatProject = (projectProfilePage: Object, lister: Object): Listing => {
  const response = {};
  const featureDescription = projectProfilePage[config.lang + '_key_point'];
  response.channels = ['new'];

  const banner = listingFormatter.formatBannerSponsorship({
    link: projectProfilePage.url_sponsor,
    title: projectProfilePage['sponsor_name_' + config.lang],
  });
  
  
  const attachments = !_.isEmpty(projectProfilePage.attachments) ?
    JSON.parse(projectProfilePage.attachments) :
    {};
    
  if (!_.isEmpty(banner)) {
    response.banner = banner;
  }
  
  response.cover = mediaFormatter.formatImageCover(
    JSON.parse(projectProfilePage.image)[0]
  );
  response.description = projectProfilePage.description;

  if (!_.isEmpty(projectProfilePage.project_brandcolor)) {
    response.color = projectProfilePage.project_brandcolor;
  }

  response.id = projectProfilePage.id;
  response.isReferralActive = Boolean(projectProfilePage.is_referral);
  response.title = projectProfilePage.project_name;
  response.subtitle = projectProfilePage.tagline;
  response.propertyType = listingFormatter.formatPropertyType(
    projectProfilePage.subtype
  );
  response.address = addressFormatter.formatAddressInfo({
    district: projectProfilePage.district_name,
    city: projectProfilePage.city_name,
    province: projectProfilePage.province_name,
    geoCoordinate: _.split(projectProfilePage.latlng, ','),
  });

  response.attributes = listingAttributeFormatter.formatAttributesInfo({
    bedroomMin: projectProfilePage.bedroom_min,
    bedroomMax: projectProfilePage.bedroom_max,
    bathroomMin: projectProfilePage.bathroom_min,
    bathroomMax: projectProfilePage.bathroom_max,
    carParkMin: projectProfilePage.garage_min,
    carParkMax: projectProfilePage.garage_max,
    totalUnits: projectProfilePage.qty_unit,
    completionDate: projectProfilePage.completion_date,
    architectName: projectProfilePage.architect_name,
    contractorName: projectProfilePage.contractor_name,
    promotion: projectProfilePage.project_promotion,
    builtUpMin: projectProfilePage.building_size_max,
    builtUpMax: projectProfilePage.building_size_min,
    landAreaMin: projectProfilePage.land_size_min,
    landAreaMax: projectProfilePage.land_size_max,
    downloadUrl: !_.isEmpty(attachments.brochure) ?
      attachments.brochure :
      '',
  });

  if (!_.isEmpty(lister)) {
    response.listers = [{ ...lister }];
  }

  response.logo = mediaFormatter.formatLogo(
    JSON.parse(projectProfilePage.logo)[0],
    config.image.baseUrl
  );
  response.multilanguagePlace = addressFormatter.formatMultiLanguageAddressInfo(
    {
      district: projectProfilePage.district_name,
      city: projectProfilePage.city_name,
      province: projectProfilePage.province_name,
    }
  );

  response.organisations = organisationFormatter.formatDeveloperInfo({
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
    logo: projectProfilePage.developer_logo,
  });

  response.prices = priceFormatter.formatPrices({
    priceMin: projectProfilePage.price_min,
    priceMax: projectProfilePage.price_max,
  });

  response.shareLink = listingFormatter.formatProjectProfilePageLink({
    projectName: projectProfilePage.project_name,
    city: projectProfilePage.city_name,
    id: projectProfilePage.id,
  });
  response.tier = listingFormatter.formatTierOfPrimaryListing(
    projectProfilePage.is_premium,
    projectProfilePage.is_gts
  );
  response.updatedAt = moment(projectProfilePage.updated_date).format('YYYY-MM-DDThh:mm:ssZ');
  response.medias = mediaFormatter.formatListingImages(
    projectProfilePage.all_listing_images
  );

  const youtubeIds = mediaFormatter.formatYoutubeIds(
    projectProfilePage.all_video
  );
  if (!_.isEmpty(youtubeIds)) {
    response.youtubeIds = youtubeIds;
  }

  if (!_.isEmpty(featureDescription)) {
    response.featureDescription = _.map(featureDescription, desc => {
      const descriptions = _.split(desc, ':');
      return `<b>${descriptions[0]}</b><p>${descriptions[1]}</p>`;
    }).join('</br></br>');
  }

  if (!_.isEmpty(projectProfilePage.website)) {
    response.website = projectProfilePage.website;
  }

  const image360s = mediaFormatter.formatThreeSixtyVideos(
    projectProfilePage.all_360_video
  );
  if (!_.isEmpty(image360s)) {
    response.image360s = image360s;
  }

  const floorPlanImages = mediaFormatter.formatFloorPlanImages(
    projectProfilePage.all_image_floorplan
  );
  if (!_.isEmpty(floorPlanImages)) {
    response.floorPlanImages = floorPlanImages;
  }

  response.features = listingFormatter.formatFeatures(
    projectProfilePage[config.lang + '_project_facilities']
  );
  
  return response;
};

const formatChildListing = (childListings: Array<Object>): Array<Listing> => {
  let listings = [];

  _.map(childListings, listing => {
    const dataListing = {};
    dataListing.price = priceFormatter.formatPrice({
      priceMin: listing.price_sort,
      priceMax: listing.price_sort,
    });

    dataListing.attributes = listingAttributeFormatter.formatAttributesInfo({
      internet: listing.connectivity,
      landArea: listing.land_size,
      builtUp: listing.building_size,
      bedroom: listing.bedroom,
      bathroom: listing.bathroom,
      electricity: listing.electricity,
      phoneLine: listing.phoneline,
      carPark: listing.garage,
    });

    dataListing.id = listing.id;
    dataListing.description = _.join(JSON.parse(listing.description), '\n');
    dataListing.title = listing.tagline;
    dataListing.unitTypeCategory = listing.subproject_name;
    dataListing.medias = mediaFormatter.formatListingImages(
      listing.unit_listing_images
    );

    const youtubeIds = mediaFormatter.formatYoutubeIds(listing.unit_video);
    if (!_.isEmpty(youtubeIds)) {
      dataListing.youtubeIds = youtubeIds;
    }

    const image360s = mediaFormatter.formatThreeSixtyVideos(
      listing.unit_360_video
    );
    if (!_.isEmpty(image360s)) {
      dataListing.image360s = image360s;
    }

    const floorPlanImages = mediaFormatter.formatFloorPlanImages(
      listing.unit_image_floorplan
    );
    if (!_.isEmpty(floorPlanImages)) {
      dataListing.floorPlanImages = floorPlanImages;
    }

    listings.push(dataListing);
  });
  return listings;
};
