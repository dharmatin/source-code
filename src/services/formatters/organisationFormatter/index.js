// @flow
import _ from 'lodash';
import config from '../../../config';
import { slugify } from '../../../libs/utility';
import type { Organisation } from './types';
import * as mediaFormatter from '../mediaFormatter';
import * as contactFormatter from '../contactFormatter';
import * as addressFormatter from '../addressFormatter';

export const formatDeveloperInfo = (
  dataDeveloper: Object
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
    }
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
  developer: Object
): string => {
  let formatUrl = config.lang === 'id' ? '/properti-baru/developer/' : '/en/new-property/developer/';
  formatUrl += slugify(developer.name) + '/' + developer.id;

  return config.url.base + formatUrl;
};
