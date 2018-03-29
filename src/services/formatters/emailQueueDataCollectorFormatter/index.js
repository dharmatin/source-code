// @flow
import _ from 'lodash';
import moment from 'moment';
import config from '../../../config';
import type { Lister, Project, Organisation, DeveloperDashboard } from './type';
import { base64Encode } from '../../../libs/utility';

export const formatProject = (project: Object): Project => {
  const priceMin = !_.isNil(project.prices)
    ? parseFloat(project.prices[0].min)
    : 0;
  const priceMax = !_.isNil(project.prices)
    ? parseFloat(project.prices[0].max)
    : 0;
  return {
    name: project.title,
    srcImage: !_.isNil(project.cover) ? project.cover.urlTemplate : '',
    priceRange: priceRangeFormat(priceMin, priceMax),
    provinceName: !_.isNil(project.multilanguagePlace)
      ? project.multilanguagePlace['en-GB'].level1
      : '',
    cityName: !_.isNil(project.multilanguagePlace)
      ? project.multilanguagePlace['en-GB'].level2
      : '',
    districtName: !_.isNil(project.multilanguagePlace)
      ? project.multilanguagePlace['en-GB'].level3
      : '',
    urlReferral: project.shareLink,
    subUnitType: !_.isNil(project.propertyType) ? project.propertyType : '',
    builtUp:
      !_.isNil(project.attributes) && !_.isNil(project.attributes.builtUp)
        ? `${project.attributes.builtUp} m²`
        : '',
    landArea:
      !_.isNil(project.attributes) && !_.isNil(project.attributes.landArea)
        ? `${project.attributes.landArea} m²`
        : '',
  };
};

export const formatLister = (lister: Object): Lister => {
  return {
    name: lister.name,
    photoUrl:
      !_.isNil(lister.image) && !_.isNil(lister.image.url)
        ? lister.image.url
        : '',
    email:
      !_.isNil(lister.contact) && !_.isNil(lister.contact.emails)
        ? lister.contact.emails[0]
        : '',
    firstName: !_.isNil(lister.name) ? lister.name.split(' ')[0] : '',
    profilePage: lister.website,
    membership: !_.isNil(lister.createdAt)
      ? membershipSince(new Date(lister.createdAt.substr(0, 10)))
      : '',
  };
};

export const formatOrganisation = (project: Object): Organisation => {
  return {
    name:
      !_.isNil(project.organisations) && !_.isNil(project.organisations[0].name)
        ? project.organisations[0].name
        : '',
    urlPage:
      !_.isNil(project.organisations) &&
      !_.isNil(project.organisations[0].website)
        ? project.organisations[0].website
        : '',
    phoneNumber:
      !_.isNil(project.organisations) &&
      !_.isNil(project.organisations[0].contact.phones[0])
        ? project.organisations[0].contact.phones[0].number
        : '',
    whatsappNumber:
      !_.isNil(project.organisations) &&
      !_.isNil(project.organisations[0].contact.phones[1])
        ? project.organisations[0].contact.phones[1].number
        : '',
    email:
      !_.isNil(project.organisations) &&
      !_.isNil(project.organisations[0].contact.emails[0])
        ? project.organisations[0].contact.emails[0]
        : '',
    logo:
      !_.isNil(project.organisations) &&
      !_.isNil(project.organisations[0].logo.url)
        ? project.organisations[0].logo.url
        : '',
  };
};

export const formatDeveloperDashboard = (data: Object): DeveloperDashboard => {
  return {
    urlApprovalPage: `${
      config.url.base
    }/developer/referral-dashboard/?approve=${base64Encode(
      JSON.stringify(data.dataApproval)
    )}`,
    totalPendingRequest: data.totalPending,
    urlReferralDashboard: `${config.url.base}/developer/referral-dashboard`,
  };
};

const priceRangeFormat = (min: number, max: number): string => {
  let format = '';
  const hasMinPrice = min !== 0;
  const hasMaxPrice = max !== 0;
  const isMaxPrice = max > min;
  const hasWordingFrom =
    (hasMinPrice && hasMaxPrice && !isMaxPrice) ||
    (hasMinPrice && !hasMaxPrice && !isMaxPrice);
  const hasWordingUpTo =
    (hasMinPrice && hasMaxPrice && isMaxPrice) ||
    (!hasMinPrice && hasMaxPrice && isMaxPrice);

  if (hasWordingFrom) {
    format = `${config.translator.from} ${priceFormat(min)}`;
  } else if (hasWordingUpTo) {
    format = `${config.translator.up_to} ${priceFormat(max)}`;
  } else {
    format = config.translator.contact_developer;
  }

  return format;
};

const priceFormat = (price: number): string => {
  const isTrillion = parseInt((price / Math.pow(10, 12)).toFixed(1)) > 0;
  const isBillion = parseInt((price / Math.pow(10, 9)).toFixed(1)) > 0;
  const isMillion = parseInt((price / Math.pow(10, 6)).toFixed(1)) > 0;
  const isThousand = parseInt((price / Math.pow(10, 3)).toFixed(1)) > 0;

  if (isTrillion)
    return `Rp. ${parseFloat(
      (price / Math.pow(10, 12)).toFixed(1)
    ).toLocaleString(config.lang)} ${
      config.translator.price_unit_short.trillion
    }`;
  if (isBillion)
    return `Rp. ${parseFloat(
      (price / Math.pow(10, 9)).toFixed(1)
    ).toLocaleString(config.lang)} ${
      config.translator.price_unit_short.billion
    }`;
  if (isMillion)
    return `Rp. ${parseFloat(
      (price / Math.pow(10, 6)).toFixed(1)
    ).toLocaleString(config.lang)} ${
      config.translator.price_unit_short.million
    }`;
  if (isThousand)
    return `Rp. ${parseFloat(
      (price / Math.pow(10, 3)).toFixed(1)
    ).toLocaleString(config.lang)} K`;

  return `Rp. ${price.toLocaleString(config.lang)}`;
};

const membershipSince = (registeredDate: Date): string => {
  let registeredSince = '';
  const monthsRegistered = moment(new Date()).diff(
    moment(registeredDate),
    'months'
  );
  const yearsRegistered = Math.ceil(monthsRegistered / 12);

  registeredSince =
    yearsRegistered === 1 && (monthsRegistered >= 0 && monthsRegistered <= 6)
      ? `6 ${config.translator.period.month} ${config.translator.ago}`
      : `${yearsRegistered} ${config.translator.period.year} ${
          config.translator.ago
        }`;

  return registeredSince;
};
