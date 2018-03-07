// @flow
import _ from 'lodash';
import config from '../../../config';
import {slugify} from '../../../libs/utility';
import type {Organisation} from './types';
import * as mediaFormatter from '../mediaFormatter';
import * as contactFormatter from '../contactFormatter';
import * as addressFormatter from '../addressFormatter';

export const formatterDeveloperInfo = (dataDeveloper: Object, lang: string): Array<Organisation> => {
  const organisations = [];
  const organisation = {};

  organisation.id = dataDeveloper.id;
  organisation.type = 'developer';
  organisation.name = dataDeveloper.name;
  organisation.logo = mediaFormatter.formatterLogo(dataDeveloper.logo, config.image.baseUrl);
  organisation.website = formatterDeveloperLink({
    name: dataDeveloper.name,
    id: dataDeveloper.id
  }, lang);

  organisation.contact = contactFormatter.formatterContactInfo({
    mainContact: dataDeveloper.mainContact,
    secondaryContact: dataDeveloper.secondaryContact,
    email: dataDeveloper.email,
    additionalEmail: dataDeveloper.additionalEmail,
    whatsapp: dataDeveloper.whatsapp
  });

  if (!_.isEmpty(dataDeveloper.color)) {
    organisation.color = dataDeveloper.color;
  }

  organisation.address = addressFormatter.formatterAddressInfo({
    city: dataDeveloper.city,
    district: dataDeveloper.district,
    province: dataDeveloper.province,
    address: dataDeveloper.address
  });

  organisations.push(organisation);

  return organisations;
};

export const formatterDeveloperLink = (developer: Object, lang: string): string => {
  let formatUrl = '';
  if (lang === 'id') {
    formatUrl = '/properti-baru/developer/' + slugify(developer.name) + '/' + developer.id;
  } else {
    formatUrl = '/en/new-property/developer/' + slugify(developer.name) + '/' + developer.id;
  }

  return config.url.base + formatUrl;
};
