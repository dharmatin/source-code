// @flow
import _ from 'lodash';
import config from '../../config/index';
import { getAddressInfo } from './addressFormatter';
import { slugify } from '../../libs/utility';

export const getDeveloperInfo = (dataDeveloper: Object, lang: string) => {
  const organisation = {};

  organisation.id = dataDeveloper.id;
  organisation.type = 'Developer';
  organisation.name = dataDeveloper.name;
  organisation.logo = getLogoDeveloper(dataDeveloper.logo);
  organisation.website = getDeveloperLink({
    name: dataDeveloper.name,
    id: dataDeveloper.id
  }, lang);

  organisation.contact = getDeveloperContact({
    mainContact: dataDeveloper.mainContact,
    secondaryContact: dataDeveloper.secondaryContact,
    email: dataDeveloper.email,
    additionalEmail: dataDeveloper.additionalEmail,
    whatsapp: dataDeveloper.whatsapp
  });

  if (!_.isEmpty(dataDeveloper.color)) {
    organisation.color = dataDeveloper.color;
  }

  _.merge(organisation,
    getAddressInfo({
      city: dataDeveloper.city,
      district: dataDeveloper.district,
      province: dataDeveloper.province,
      address: dataDeveloper.address
    })
  );

  return {organisations: [{...organisation}]};
};

export const getDeveloperLink = (obj: {name: string, id: number}, lang: string): string => {
  let formatUrl = '';
  if (lang === 'id') {
    formatUrl = '/properti-baru/developer/' + slugify(obj.name) + '/' + obj.id;
  } else {
    formatUrl = '/en/new-property/developer/' + slugify(obj.name) + '/' + obj.id;
  }

  return config.url.base + formatUrl;
};

const getDeveloperPhone = (developerPhones: Object) => {
  let phone = {};
  const phones = [];

  if (developerPhones.mainContact !== '') {
    phone = {
      label: 'LandLine',
      number: '+' + developerPhones.mainContact.toString()
    };
    phones.push(phone);
  }

  if (developerPhones.secondaryContact !== '') {
    phone = {
      label: 'LandLine',
      number: '+' + developerPhones.secondaryContact.toString()
    };
    phones.push(phone);
  }

  if (developerPhones.whatsapp !== '') {
    phone = {
      label: 'Whatsapp',
      number: developerPhones.whatsapp.toString()
    };
    phones.push(phone);
  }

  return {phones: phones};
};

const getDeveloperContact = (contact: Object) => {
  return _.assign(
    getDeveloperPhone({
      mainContact: contact.mainContact,
      secondaryContact: contact.mainContact,
      whatsapp: contact.whatsapp
    }),
    {emails: [contact.email, contact.additionalEmail]}
  );
};

export const getLogoDeveloper = (logo: string) => {
  const response = {
    type: 'image',
    url: config.image.baseUrl + '/' + logo
  };

  return response;
};