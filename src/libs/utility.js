// @flow
import _ from 'lodash';

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
  let url = youtubeUrl.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  return url[2] !== undefined ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
};

export const formatterToLocalizeNumber = (
  num: string,
  localCountry?: string
): string => {
  let localizeNumber = num.toString();
  if (localCountry === 'id') {
    localizeNumber = localizeNumber.replace('.', ',');
  }

  return localizeNumber.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
};

export const getAdsIdDescription = (adsId: string): Object => {
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

