// @flow
import _ from 'lodash';
import type { BannerSponsorship, Features, ObjectListingId } from './types';
import config from '../../../config';
import { slugify, extractListingId } from '../../../libs/utility';

export const formatBannerSponsorship = (banner: Object): BannerSponsorship => {
  return !_.isNil(banner.link) ? banner : {};
};

export const formatTierOfPrimaryListing = (
  isPremium: number,
  isGTS: number
): number => {
  if (isPremium === 0) {
    return config.TIER.STANDARD;
  } else {
    if (isGTS === 1) {
      return config.TIER.FEATURED;
    } else {
      return config.TIER.PREMIUM;
    }
  }
};

export const formatFeatures = (facilities: Array<string>): Array<Features> => {
  const responseFeatures = [];
  _.map(facilities, (facility: string) => {
    const medias = {};
    let dataFacility = _.split(facility, ':');
    medias.description = dataFacility[2];
    medias.title = dataFacility[0];

    /* eslint-disable no-template-curly-in-string */
    medias.media = {
      type: 'image',
      urlTemplate:
        config.image.sharpieUrl +
        '/premium/${width}x${height}-${scale}/' +
        JSON.parse(dataFacility[1])[0],
    };
    responseFeatures.push(medias);
  });

  return responseFeatures;
};

export const formatPropertyType = (propertyType: Array<string>): string => {
  const propertyTypeResponse = _.map(propertyType, (item: string): string => {
    return `${
      config.translator.long_property_type[config.PROPERTY_TYPE[item]]
    }`;
  }).join(' / ');

  return propertyTypeResponse;
};

export const formatProjectProfilePageLink = (
  projectProfile: Object
): string => {
  const { projectName, city, id, referralCode } = projectProfile;

  let formatUrl = config.lang === 'id' ? '/properti/' : '/en/property/';
  formatUrl += slugify(city) + '/' + slugify(projectName) + '/' + id;

  if (!_.isNil(referralCode)) {
    formatUrl += `?referralCode=${referralCode}`;
  }

  return config.url.newlaunch + formatUrl;
};

export const formatListingIdToObjectId = (
  listingId: string
): ObjectListingId => {
  const listingDetail = extractListingId(listingId);
  return {
    adsProjectId: listingDetail.id,
    propertyType: listingDetail.type,
    propertyCategory: listingDetail.category,
  };
};

export const formatListingActive = (status: string): boolean => {
  return status === 'Online';
};
