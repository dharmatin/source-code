import _ from 'lodash';
import config from '../../config/index';
import { getAddressInfo } from './addressFormatter';
import { slugify } from '../../libs/utility';

export const getDeveloperInfo = dataDeveloper => {
  const organisation = {
    id: dataDeveloper.id,
    type: 'Developer',
    name: dataDeveloper.name,
    website: getDeveloperLink({
      name: dataDeveloper.name,
      id: dataDeveloper.id
    }),
    contact: getDeveloperContact({
      mainContact: dataDeveloper.mainContact,
      secondaryContact: dataDeveloper.secondaryContact,
      email: dataDeveloper.email,
      additionalEmail: dataDeveloper.additionalEmail,
      whatsapp: dataDeveloper.whatsapp
    })
  };

  if (!_.isEmpty(dataDeveloper.brandColor)) {
    organisation.brandColor = dataDeveloper.brandColor;
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

export const getDeveloperLink = param => {
  let formatUrl = '';
  if (param.lang === 'id') {
    formatUrl = '/properti-baru/developer/' + slugify(param.name) + '/' + param.id;
  } else {
    formatUrl = '/en/new-property/developer/' + slugify(param.name) + '/' + param.id;
  }

  return config.url.base + formatUrl;
};

const getDeveloperPhone = developerPhones => {
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

const getDeveloperContact = contact => {
  return _.assign(
    getDeveloperPhone({
      mainContact: contact.mainContact,
      secondaryContact: contact.mainContact,
      whatsapp: contact.whatsapp
    }),
    {emails: [contact.email, contact.additionalEmail]}
  );
};
