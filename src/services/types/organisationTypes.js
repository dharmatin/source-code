// @flow
import type { Media } from './mediaTypes';
import type { Contact } from './contactTypes';
import type { Address } from './addressTypes';

export type Organisation = {
	id: string,
	color: string,
	logo: Media,
	name: string,
	type: string,
	website: string,
	contact: Contact,
	address: Address
};
