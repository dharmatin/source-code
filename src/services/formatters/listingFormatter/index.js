// @flow
import _ from 'lodash';
import type {BannerSponsorship, Features} from './types';
import config from '../../../config';
import {slugify} from '../../../libs/utility';

export const formatBannerSponsorship = (banner: Object): BannerSponsorship => {
  return !_.isNil(banner.link) ? banner : {};
};

export const formatTierOfPrimaryListing = (isPremium: number, isGTS: number): number => {
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
  _.map(facilities, (facility) => {
    const medias = {};
    let dataFacility = _.split(facility, ':');

    medias.description = dataFacility[0];
    medias.title = dataFacility[0];
    medias.media = {
      type: 'image',
      urlTemplate: config.image.sharpieUrl + '/premium/${width}x${height}-${scale}/' + JSON.parse(dataFacility[1])[0]
    };
    responseFeatures.push(medias);
  });

  return responseFeatures;
};

export const formatPropertyType = (propertyType: Array<string>): string => {
  const propertyTypeResponse = _.map(propertyType, (item) => {
    return `${config.propertyType[item]}`;
  }).join(' / ');

  return propertyTypeResponse;
};

export const formatProjectProfilePageLink = (projectProfile: Object, lang: string): string => {
  const {projectName, city, id} = projectProfile;

  let formatUrl = '';
  if (lang === 'id') {
    formatUrl = '/properti/' + slugify(city) + '/' + slugify(projectName) + '/' + id;
  } else {
    formatUrl = '/en/property/' + slugify(city) + '/' + slugify(projectName) + '/' + id;
  }

  return config.url.newlaunch + formatUrl;
};
