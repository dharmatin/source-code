import _ from 'lodash';
import type { Lister, ListerRequest } from './type';
import config from '../../../../config';
import { slugify } from '../../../../libs/utility';
import type { ObjectUrl } from '../generalFormatter/type';

const formatLister = (request: ListerRequest, type: string): Array<Lister> => {
  let lister: Lister = {
    id: (request.id).toString(),
    name: !_.isUndefined(request.name) ? request.name : request.company,
    type: type,
    website: getListerProfileUrl(request)
  };
  if (!_.isEmpty(request.registeredAt)) lister.createdAt = request.registeredAt;
  if (!_.isEmpty(request.contact)) lister.contact = request.contact;
  if (_.isEqual(type, 'agency')) {
    if (!_.isEmpty(request.photo)) lister.logo = formatUrlToObjectUrl(request.photo);
  } else {
    if (!_.isEmpty(request.photo)) lister.image = formatUrlToObjectUrl(request.photo);
  }

  return [lister];
};

export const getListerProfileUrl = (request: ListerRequest): string => {
  let formatUrl = `${config.lang === 'id' ? 'agen-properti' : 'en/property-agent'}/${slugify(request.company)}`;
  formatUrl += !_.isUndefined(request.name) ? `/${slugify(request.name)}-${request.id}/` : `-${request.id}/`;

  return `${config.url.base}/${formatUrl}`;
};

const formatUrlToObjectUrl = (url: string): ObjectUrl => {
  return {
    url: url
  };
};

export default formatLister;
