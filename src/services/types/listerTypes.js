// @flow
import type { Media } from './mediaTypes';
import type { Contact } from './contactTypes';

export type Lister = {
	id: string,
	type: string,
	name: string,
	createdAt: Date,
	website: string,
	image: Media,
	contact: Contact
};
