// @flow
import type { Media } from '../mediaFormatter/types';
import type { Contact } from '../contactFormatter/types';
import type { Address } from '../addressFormatter/types';

export type Organisation = {
	address: Address,
	color?: string,
	contact: Contact,
	id: string,
	logo: Media,
	name: string,
	type: string,
	website: string
};
