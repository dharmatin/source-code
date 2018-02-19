import _ from 'lodash';
import config from '../../config/index';
import Address from './address';
import Utility from './utility';

function getDeveloper(param, lang) {
  const response = {
    organisations: []
  };
  response.organisations.push({
    id: param.developer_company_id,
    type: 'Developer',
    name: param.developer_name,
    website: getDeveloperLink(param, lang),
    contact: getDeveloperContact(param)
  });

  _.merge(response.organisations[0], Address.getDeveloperAddress(param));

  return response;
}

function getDeveloperLink(param, lang) {
  let formatUrl = '';
  if (lang === 'id') {
    formatUrl = '/properti-baru/developer/' + Utility.slugify(param.developer_name) + '/' + param.developer_company_id;
  } else {
    formatUrl = '/en/new-property/developer/' + Utility.slugify(param.developer_name) + '/' + param.developer_company_id;
  }

  return config.url.newlaunch + formatUrl;
}

function getDeveloperPhone(param) {
  let phone = {};
  const response = {
    phones: []
  };

  if (param.developer_contactno1 !== '') {
    phone = {
      label: 'LandLine',
      number: param.developer_contactno1.toString()
    };
    response.phones.push(phone);
  }

  if (param.developer_contactno1 !== '') {
    phone = {
      label: 'LandLine',
      number: param.developer_contactno2.toString()
    };
    response.phones.push(phone);
  }

  return response;
}

function getDeveloperEmail(param) {
  const response = {};
  response.emails = [
    param.developer_email
  ];

  return response;
}

function getDeveloperContact(param) {
  return _.assign(getDeveloperPhone(param), getDeveloperEmail(param));

  return response;
}

module.exports = getDeveloper;
