// @flow
import _ from 'lodash';
import config from '../../../config';
import { slugify } from '../../../libs/utility';
import type { Organisation } from './types';
import * as mediaFormatter from '../mediaFormatter';
import * as contactFormatter from '../contactFormatter';
import * as addressFormatter from '../addressFormatter';

export const formatDeveloperInfo = (
  dataDeveloper: Object,
  lang: string
): Array<Organisation> => {
  const organisations = [];
  const organisation = {};

  organisation.id = dataDeveloper.id;
  organisation.type = 'developer';
  organisation.name = dataDeveloper.name;
  organisation.logo = mediaFormatter.formatLogo(
    dataDeveloper.logo,
    config.image.baseUrl
  );
  organisation.website = formatDeveloperLink(
    {
      name: dataDeveloper.name,
      id: dataDeveloper.id,
    },
    lang
  );

  organisation.contact = contactFormatter.formatContactInfo({
    mainContact: dataDeveloper.mainContact,
    secondaryContact: dataDeveloper.secondaryContact,
    email: dataDeveloper.email,
    additionalEmail: dataDeveloper.additionalEmail,
    whatsapp: dataDeveloper.whatsapp,
  });

  if (!_.isEmpty(dataDeveloper.color)) {
    organisation.color = dataDeveloper.color;
  }

  organisation.address = addressFormatter.formatAddressInfo({
    city: dataDeveloper.city,
    district: dataDeveloper.district,
    province: dataDeveloper.province,
    address: dataDeveloper.address,
  });

  organisations.push(organisation);

  return organisations;
};

export const formatDeveloperLink = (
  developer: Object,
  lang: string
): string => {
  let formatUrl = '';
  if (lang === 'id') {
    formatUrl =
      '/properti-baru/developer/' +
      slugify(developer.name) +
      '/' +
      developer.id;
  } else {
    formatUrl =
      '/en/new-property/developer/' +
      slugify(developer.name) +
      '/' +
      developer.id;
  }

  return config.url.base + formatUrl;
};
