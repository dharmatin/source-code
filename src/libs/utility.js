// @flow
import _ from 'lodash';
import config from '../config';

export const toISOFormatting = (strDate: string): string => {
  const dateFormatted = new Date(strDate);
  return dateFormatted.toISOString();
};

export const slugify = (strUrl: string): string => {
  return strUrl
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

export const getYoutubeId = (youtubeUrl: string): string => {
  const url = youtubeUrl.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  return !_.isNil(url[2]) ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
};

export const getUrlSharpie = (srcS3Image: string, isPremimum = false): string => {
  const baseUrl = config.image.sharpieUrl + '/' + (isPremimum ? 'premium/' : '') + '${width}x${height}-${scale}';
  return baseUrl + '/' + srcS3Image;
};

export const getDateTimeISO = (date: string): string => {
  const validateDateTime = date.slice(0, -2);
  const explodeDateTime = validateDateTime.split(' ');
  return explodeDateTime[0] + 'T' + explodeDateTime[1] + '+07:00';
};

export const getFirstParagraph = (html: string): string => {
  const paragraph = html.match(/<\s*?p\b[^>]*>(.+)<\/p\b[^>]*>/g);
  return paragraph[0].replace(/<[^>]+>/ig, '');
};

export const extractListingId = (adsId: string): Object => {
  const id = adsId.substr(3);
  const category = adsId.substr(2, 1);
  const type = adsId.substr(0, 2);

  return {
    id: id,
    category: category,
    type: type
  };
};

export const getReferralCode = (): string => {
  const time = new Date().getTime();

  return (time).toString(36).toLocaleUpperCase();
};