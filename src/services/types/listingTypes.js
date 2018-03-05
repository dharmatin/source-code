// @flow
import type { Media } from './mediaTypes';
import type { Lister } from './listerTypes';
import type { Address, MultiLanguagePlace } from './addressTypes';
import type { Organisation } from './organisationTypes';
import type { Price } from './priceTypes';
import type { Attributes } from './attributeTypes';

export type BannerSponsorship = {
	link?: string,
	title?: string
};

export type Features = {
	description: string,
	title: string,
	media: Media
};

export type Listing = {
	address: Address,
	attributes: Attributes,
	banner?: BannerSponsorship,
	channels: Array<string>,
	completionDate?: string,
	color?: string,
	cover?: Media,
	description?: string,
	featureDescription?: string,
	features?: Array<Features>,
	floorPlanImages?: Array<Media>,
	id: string,
	Image360s?: Array<string>,
	listers?: Array<Lister>,
	logo: Media,
	medias: Array<Media>,
	multilanguagePlace: MultiLanguagePlace,
	organisations?: Array<Organisation>,
	prices: Array<Price>,
	promotion?: string,
	propertyType: string,
	shareLink: string,
	subtitle: string,
	tier: number,
	title: string,
	totalUnits?: string,
	unitTypeCategory?: string,
	updatedAt: Date,
	youtubeIds?: Array<string>
};
