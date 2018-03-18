// @flow
import _ from 'lodash';
import { sprintf } from 'sprintf-js';
import moment from 'moment';
import config from '../../../config';
import type { Lister, Project, Organisation } from './type';
import { formatlisterPageLink } from '../listerFormatter';
import { formatDeveloperLink } from '../organisationFormatter';

export const formatProject = (listing: Object): Project => {
  return {

    name: listing.project_name,
    srcImage: `${config.image.baseUrl}/${JSON.parse(listing.image)[0]}`,
    priceRange: priceRangeFormat(parseFloat(listing.price_min), parseFloat(listing.price_max)),
    provinceName: listing.province_name,
    cityName: listing.city_name,
    districtName: listing.district_name,
    urlReferral: '',
    subUnitType: generatePropertySubType(listing.subtype),
    builtUp: builtUpRangeFormat(parseFloat(listing.building_size_min), parseFloat(listing.building_size_max)),
    grossArea: grossRangeFormat(parseFloat(listing.land_size_min), parseFloat(listing.land_size_max))
  };
};

export const formatLister = (lister: Object): Lister => {
  return {
    name: lister.name,
    photoUrl: lister.photo_url,
    email: lister.email,
    firstName: (lister.name).split(' ')[0],
    profilePage: formatlisterPageLink({ organisationName: lister.company2, listerName: lister.name, id: lister.id }),
    membership: membershipSince(new Date(lister.register * 1000))
  };
};

export const formatOrganisation = (listing: Object): Organisation => {
  return {
    name: listing.developer_name,
    urlPage: formatDeveloperLink({name: listing.developer_name, id: listing.developer_company_id}),
    phoneNumber: listing.developer_contactno1,
    whatsappNumber: listing.project_whatsapp,
    email: listing.developer_email,
    logo: `${config.image.baseUrl}/${listing.developer_logo}`
  };
};

const generatePropertySubType = (subtype: Array<string>): string => {
  let subTypeName = [];
  _.map(subtype, (value: string) => {
    subTypeName.push(config.translator.short_property_type[value]);
  });

  return _.join(subTypeName, '/ ');
};

const priceRangeFormat = (min: number, max: number): string => {
  let format = '';
  const hasMinPrice = (min !== 0);
  const hasMaxPrice = (max !== 0);
  const isMaxPrice = max > min;

  format = (hasMinPrice && hasMaxPrice && isMaxPrice) ? `${config.translator.up_to} ${priceFormat(max)}` :
    (hasMinPrice && hasMaxPrice && !isMaxPrice) ? `${config.translator.from} ${priceFormat(min)}` :
      (!hasMinPrice && hasMaxPrice && isMaxPrice) ? `${config.translator.up_to} ${priceFormat(max)}` :
        (hasMinPrice && !hasMaxPrice && !isMaxPrice) ? `${config.translator.from} ${priceFormat(min)}` :
          config.translator.contact_developer;

  return format;
};

const grossRangeFormat = (min: number, max: number): string => {
  return sprintf(rangeFormat(min, max), config.translator.area_unit.sq_m);
};

const builtUpRangeFormat = (min: number, max: number): string => {
  return sprintf(rangeFormat(min, max), config.translator.area_unit.sq_ft);
};

const rangeFormat = (min: number, max: number): string => {
  let format = '';
  const hasMinValue = (min !== 0);
  const hasMaxValue = (max !== 0);
  const isMaxValue = max > min;

  format = (hasMinValue && hasMaxValue && isMaxValue) ? `${min} - ${max} %s` :
    (hasMinValue && hasMaxValue && !isMaxValue) ? `${config.translator.from} ${min} %s` :
      (!hasMinValue && hasMaxValue && isMaxValue) ? `${config.translator.up_to} ${max} %s` :
        (hasMinValue && !hasMaxValue && !isMaxValue) ? `${config.translator.from} ${min} %s` :
          config.translator.contact_developer;

  return format;
};

const priceFormat = (price: number): string => {
  const isTrillion = parseInt((price / Math.pow(10, 12)).toFixed(1)) > 0;
  const isBillion = parseInt((price / Math.pow(10, 9)).toFixed(1)) > 0;
  const isMillion = parseInt((price / Math.pow(10, 6)).toFixed(1)) > 0;
  const isThousand = parseInt((price / Math.pow(10, 3)).toFixed(1)) > 0;

  if (isTrillion) return `Rp. ${parseFloat((price / Math.pow(10, 12)).toFixed(1)).toLocaleString(config.lang)} ${config.translator.price_unit_short.trillion}`;
  if (isBillion) return `Rp. ${parseFloat((price / Math.pow(10, 9)).toFixed(1)).toLocaleString(config.lang)} ${config.translator.price_unit_short.billion}`;
  if (isMillion) return `Rp. ${parseFloat((price / Math.pow(10, 6)).toFixed(1)).toLocaleString(config.lang)} ${config.translator.price_unit_short.million}`;
  if (isThousand) return `Rp. ${parseFloat((price / Math.pow(10, 3)).toFixed(1)).toLocaleString(config.lang)} K`;

  return `Rp. ${price.toLocaleString(config.lang)}`;
};

const membershipSince = (registeredDate: Date): string => {
  let registeredSince = '';
  const monthsRegistered = moment(new Date()).diff(moment(registeredDate), 'months');
  const yearsRegistered = Math.ceil(monthsRegistered / 12);

  registeredSince = (yearsRegistered === 1 && (monthsRegistered >= 0 && monthsRegistered <= 6)) ? `6 ${config.translator.period.month} ${config.translator.ago}` :
    yearsRegistered === 1 ? `1 ${config.translator.period.year} ${config.translator.ago}` : `${yearsRegistered} ${config.translator.period.year} ${config.translator.ago}`;

  return registeredSince;
};
