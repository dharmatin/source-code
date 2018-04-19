// @flow
import _ from 'lodash';
import config from '../../../config';
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

export const formatProject = (
  projectProfilePage: Object,
  lister: Object
): Listing => {
  const response = {};

  response.channels = ['new'];

  if (!_.isNil(projectProfilePage.url_sponsor)) {
    const banner = listingFormatter.formatBannerSponsorship({
      link: projectProfilePage.url_sponsor,
      title: projectProfilePage['sponsor_name_' + config.lang],
    });

    if (!_.isEmpty(banner)) {
      response.banner = banner;
    }
  }

  response.cover = mediaFormatter.formatImageCover(
    JSON.parse(projectProfilePage.background_image || '[]')[0]
  );

  if (!_.isNil(projectProfilePage.description)) {
    response.description = projectProfilePage.description;
  }

  if (
    !_.isNil(projectProfilePage.project_brandcolor) &&
    !_.isEmpty(projectProfilePage.project_brandcolor)
  ) {
    response.color = projectProfilePage.project_brandcolor;
  }

  response.id = projectProfilePage.id;

  if (!_.isNil(projectProfilePage.is_referral)) {
    response.isReferralActive = Boolean(projectProfilePage.is_referral);
  }
  response.title = projectProfilePage.project_name;
  response.subtitle = projectProfilePage.tagline;
  response.propertyType = listingFormatter.formatPropertyType(
    projectProfilePage.subtype
  );

  if (!_.isNil(projectProfilePage.latlng)) {
    response.address = addressFormatter.formatAddressInfo({
      district: projectProfilePage.district_name,
      city: projectProfilePage.city_name,
      province: projectProfilePage.province_name,
      geoCoordinate: _.split(projectProfilePage.latlng, ','),
    });
  }

  const listingAttributes = {};
  listingAttributes.bedroomMin = projectProfilePage.bedroom_min;
  listingAttributes.bedroomMax = projectProfilePage.bedroom_max;
  listingAttributes.bathroomMin = projectProfilePage.bathroom_min;
  listingAttributes.bathroomMax = projectProfilePage.bathroom_max;
  listingAttributes.carParkMin = projectProfilePage.garage_min;
  listingAttributes.carParkMax = projectProfilePage.garage_max;
  if (!_.isNil(projectProfilePage.qty_unit)) {
    listingAttributes.totalUnits = projectProfilePage.qty_unit;
  }
  listingAttributes.completionDate = projectProfilePage.completion_date;
  listingAttributes.architectName = projectProfilePage.architect_name;
  listingAttributes.contractorName = projectProfilePage.contractor_name;
  listingAttributes.promotion = projectProfilePage.project_promotion;
  listingAttributes.builtUpMin = projectProfilePage.building_size_min;
  listingAttributes.builtUpMax = projectProfilePage.building_size_max;
  listingAttributes.landAreaMin = projectProfilePage.land_size_min;
  listingAttributes.landAreaMax = projectProfilePage.land_size_max;

  const attachments = !_.isEmpty(projectProfilePage.attachments) ?
    JSON.parse(projectProfilePage.attachments) :
    {};

  if (!_.isEmpty(attachments)) {
    listingAttributes.downloadUrl = !_.isEmpty(attachments.brochure) ?
      attachments.brochure :
      '';
  }

  response.attributes = listingAttributeFormatter.formatAttributesInfo(
    listingAttributes
  );

  if (!_.isEmpty(lister)) {
    response.listers = [{ ...lister }];
  }

  if (!_.isNil(projectProfilePage.logo)) {
    response.logo = mediaFormatter.formatLogo(
      JSON.parse(projectProfilePage.logo)[0],
      config.image.baseUrl
    );
  }

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

  response.active = listingFormatter.formatListingActive(
    projectProfilePage.status
  );

  response.productStatus = projectProfilePage.product_status;
  response.tier = listingFormatter.formatTierOfPrimaryListing(
    projectProfilePage.is_premium,
    projectProfilePage.is_gts
  );
  response.updatedAt = moment(projectProfilePage.updated_date).format(
    'YYYY-MM-DDThh:mm:ssZ'
  );

  if (!_.isNil(projectProfilePage.all_listing_images)) {
    let mediaImages = projectProfilePage.all_listing_images;
    const backgroundImages = JSON.parse(projectProfilePage.background_image);
    _.forEachRight(backgroundImages, (value: string) => {
      mediaImages.unshift(`"${value}";${projectProfilePage.project_name}`);
    });

    response.medias = mediaFormatter.formatListingImages(mediaImages);
  }

  if (!_.isNil(projectProfilePage.all_video)) {
    const youtubeIds = mediaFormatter.formatYoutubeIds(
      projectProfilePage.all_video
    );
    if (!_.isEmpty(youtubeIds)) {
      response.youtubeIds = youtubeIds;
    }
  }

  if (!_.isNil(projectProfilePage[config.lang + '_key_point'])) {
    const featureDescription = projectProfilePage[config.lang + '_key_point'];
    if (!_.isEmpty(featureDescription)) {
      response.featureDescription = _.map(
        featureDescription,
        (desc: string): string => {
          const descriptions = _.split(desc, ':');
          return `<b>${descriptions[0]}</b><p>${descriptions[1]}</p>`;
        }
      ).join('</br></br>');
    }
  }

  if (
    !_.isNil(projectProfilePage.website) &&
    !_.isEmpty(projectProfilePage.website)
  ) {
    response.website = projectProfilePage.website;
  }

  if (!_.isNil(projectProfilePage.all_360_video)) {
    const image360s = mediaFormatter.formatThreeSixtyVideos(
      projectProfilePage.all_360_video
    );
    if (!_.isEmpty(image360s)) {
      response.image360s = image360s;
    }
  }

  if (!_.isNil(projectProfilePage.all_image_floorplan)) {
    const floorPlanImages = mediaFormatter.formatFloorPlanImages(
      projectProfilePage.all_image_floorplan
    );
    if (!_.isEmpty(floorPlanImages)) {
      response.floorPlanImages = floorPlanImages;
    }
  }

  if (!_.isNil(projectProfilePage[config.lang + '_project_facilities'])) {
    response.features = listingFormatter.formatFeatures(
      projectProfilePage[config.lang + '_project_facilities']
    );
  }

  return response;
};

const formatChildListing = (childListings: Array<Object>): Array<Listing> => {
  let listings = [];

  _.map(childListings, (listing: Object) => {
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
