// @flow

import type { ObjectUrl } from '../generalFormatter/type';

export type Organisation = {
  id: string,
  name: string,
  type: string,
  website: string,
  logo: ObjectUrl
};
