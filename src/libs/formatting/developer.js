import _ from 'lodash';
import config from '../../config/index';
import { getAddress } from './address';
import { slugify } from './utility';

export function getDeveloper(dataDeveloper, lang) {
  const response = {
    organisations: []
  };
  response.organisations.push({
    id: dataDeveloper.id,
    type: 'Developer',
    name: dataDeveloper.name,
    website: getDeveloperLink({
      name: dataDeveloper.name,
      id: dataDeveloper.id,
    }, lang),
    contact: getDeveloperContact({
      mainContact: dataDeveloper.mainContact,
      secondaryContact: dataDeveloper.secondaryContact,
      email: dataDeveloper.email
    }),
    brandColor: dataDeveloper.brandColor
  });
  
  _.merge(response.organisations[0],
    getAddress({
      city: dataDeveloper.city,
      district: dataDeveloper.district,
      province: dataDeveloper.province,
      address: dataDeveloper.address
    })
  );

  return response;
}

function getDeveloperLink(param, lang) {
  let formatUrl = '';
  if (lang === 'id') {
    formatUrl = '/properti-baru/developer/' + slugify(param.name) + '/' + param.id;
  } else {
    formatUrl = '/en/new-property/developer/' + slugify(param.name) + '/' + param.id;
  }

  return config.url.newlaunch + formatUrl;
}

function getDeveloperPhone(phones) {
  let phone = {};
  const response = {
    phones: []
  };

  if (phones.mainContact !== '') {
    phone = {
      label: 'LandLine',
      number: phones.mainContact.toString()
    };
    response.phones.push(phone);
  }

  if (phones.secondaryContact !== '') {
    phone = {
      label: 'LandLine',
      number: phones.secondaryContact.toString()
    };
    response.phones.push(phone);
  }

  return response;
}

function getDeveloperEmail(email) {
  const response = {};
  response.emails = [
    email
  ];

  return response;
}

function getDeveloperContact(contact) {
  return _.assign(
    getDeveloperPhone({
      mainContact: contact.mainContact,
      secondaryContact: contact.mainContact
    }),
    getDeveloperEmail(contact.email)
  );

  return response;
}
