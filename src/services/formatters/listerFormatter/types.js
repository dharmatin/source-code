// @flow
import type { Media } from '../mediaFormatter/types';
import type { Contact } from '../contactFormatter/types';

export type Lister = {
  id: string,
  type: string,
  name: string,
  createdAt: Date,
  website: string,
  image: Media,
  contact: Contact,
};
