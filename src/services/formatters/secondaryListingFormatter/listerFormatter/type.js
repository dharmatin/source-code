// @flow
import type { ObjectUrl } from '../generalFormatter/type';
import type { Contact } from '../contactFormatter/type';

export type Lister = {
  id: string,
  type: string,
  name: string,
  createdAt?: Date,
  website?: string,
  image?: ObjectUrl,
  logo?: ObjectUrl,
  contact?: Contact
};

export type ListerRequest = {
  id: string,
  name?: string,
  photo?: string,
  registeredAt?: Date,
  company?: string,
  contact: Contact
};
