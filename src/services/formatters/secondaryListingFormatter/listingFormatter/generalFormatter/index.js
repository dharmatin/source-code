// @flow

import _ from 'lodash';
import { unserialize } from 'php-serialization';
import type { Banner } from './type';
import { slugify } from '../../../../../libs/utility';
import config from '../../../../../config';

export const formatListingDetailUrl = (id: string, city: string): string => {
  let formatUrl = config.lang === 'id' ? '/properti/' : '/en/property/';
  formatUrl += slugify(city) + '/' + id;

  return config.url.base + formatUrl;
};

export const formatDescription = (description: string): string => {
  return description;
};

export const formatFeatureDescription = (facility: string): string => {
  let facilities = [];
  if (!_.isEqual(facility, '0') && !_.isEmpty(facility)) {
    facilities = _.map(unserialize(facility).__attr__, (attribute: Object): Array<string> => {
      return attribute.val;
    });
  }
  return facilities.join(', ');
};

export const formatBanner = (listing: Object): Banner => {
  return {
    link: listing.url_sponsor,
    title: config.lang === 'id' ? listing.sponsor_name_id : listing.sponsor_name_en
  };
};
