// @flow
import _ from 'lodash';
import config from '../config';
import moment from 'moment';

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

export const getUrlSharpie = (
  srcS3Image: string,
  isPremimum: boolean = false
): string => {
  const baseUrl =
    config.image.sharpieUrl +
    '/' +
    (isPremimum ? 'premium/' : '') +
    '${width}x${height}-${scale}';
  return baseUrl + '/' + srcS3Image;
};

export const toISOFormatting = (date: string): string => {
  const validateDateTime = date.slice(0, -2);
  const explodeDateTime = validateDateTime.split(' ');
  return explodeDateTime[0] + 'T' + explodeDateTime[1] + '+07:00';
};

export const extractListingId = (adsId: string): Object => {
  const id = adsId.substr(3);
  const category = adsId.substr(2, 1);
  const type = adsId.substr(0, 2);

  return {
    id: id,
    category: category,
    type: type,
  };
};

export const generateReferralCode = (): string => {
  const time = new Date().getTime();

  return time.toString(36).toLocaleUpperCase();
};

export const getRequestForPagingParam = (
  req: any,
  defaultPageSize: number
): Object => {
  console.log('REQUEST', req.query);
  const paging = {
    pageSize: defaultPageSize,
    pageToken: 1,
  };

  if (!_.isNil(req.query.pageSize)) {
    const pageSize = parseInt(req.query.pageSize);
    if (!_.isNaN(pageSize) && pageSize > 0) {
      paging.pageSize = Math.abs(pageSize);
    }
  }

  if (!_.isNil(req.query.pageToken)) {
    const pageToken = parseInt(req.query.pageToken);
    if (!_.isNaN(pageToken) && pageToken > 0) {
      paging.pageToken = Math.abs(pageToken);
    }
  }

  return paging;
};

export const base64Encode = (data: string): string => {
  return Buffer.from(data).toString('base64');
};

export const base64Decode = (data: string): string => {
  return Buffer.from(data, 'base64').toString('ascii');
};

export const isValidDate = (date: string): boolean => {
  return moment(date).isValid();
};
