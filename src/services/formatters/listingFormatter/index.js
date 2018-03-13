// @flow
import _ from 'lodash';
import type { BannerSponsorship, Features } from './types';
import config from '../../../config';
import { slugify } from '../../../libs/utility';

export const formatBannerSponsorship = (banner: Object): BannerSponsorship => {
  return !_.isNil(banner.link) ? banner : {};
};

export const formatTierOfPrimaryListing = (
  isPremium: number,
  isGTS: number
): number => {
  if (isPremium === 0) {
    return config.tier.standard;
  } else {
    if (isGTS === 1) {
      return config.tier.featured;
    } else {
      return config.tier.premium;
    }
  }
};

export const formatFeatures = (facilities: Array<string>): Array<Features> => {
  const responseFeatures = [];
  _.map(facilities, facility => {
    const medias = {};
    let dataFacility = _.split(facility, ':');

    medias.description = dataFacility[0];
    medias.title = dataFacility[0];
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
  const propertyTypeResponse = _.map(propertyType, item => {
    return `${config.translator.long_property_type[config.propertyType[item]]}`;
  }).join(' / ');

  return propertyTypeResponse;
};

export const formatProjectProfilePageLink = (
  projectProfile: Object
): string => {
  const { projectName, city, id } = projectProfile;

  let formatUrl = config.lang === 'id' ? '/properti/' : '/en/property/';
  formatUrl += slugify(city) + '/' + slugify(projectName) + '/' + id;
  
  return config.url.newlaunch + formatUrl;
};
