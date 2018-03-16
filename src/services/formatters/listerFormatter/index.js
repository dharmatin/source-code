// @flow
import type { Lister } from './types';
import * as contactFormatter from '../contactFormatter';
import { toISOFormatting, slugify } from '../../../libs/utility';
import * as mediaFormatter from '../mediaFormatter';
import * as moment from 'moment';
import config from '../../../config';

export const formatListerProfile = (lister: Object): Object => {
  const response = {};

  if (lister.docs.length === 0) {
    return {};
  } else {
    const dataLister = lister.docs[0];

    response.id = dataLister.id;
    response.type = 'agent';
    response.name = dataLister.name;
    response.createdAt = toISOFormatting(
      moment.unix(dataLister.register).format('YYYY-MM-DD HH:mm:ss')
    );
    response.image = {
      url: dataLister.photo_url,
    };
    response.website = formatlisterPageLink({
      organisationName: dataLister.company2,
      listerName: dataLister.name,
      id: dataLister.id,
    });
    response.contact = contactFormatter.formatContactInfo({
      mainContact: dataLister.handphone,
      secondaryContact: '',
      whatsapp: '',
      email: dataLister.email,
      additionalEmail: '',
    });
  }
  return response;
};

export const formatlisterPageLink = (dataLister: Object): string => {
  const { organisationName, listerName, id } = dataLister;

  let formatUrl =
    config.lang === 'id' ? '/agen-properti/' : '/en/property-agent/';
  formatUrl += slugify(organisationName) + '/' + slugify(listerName) + '-' + id;

  return config.url.base + formatUrl;
};
