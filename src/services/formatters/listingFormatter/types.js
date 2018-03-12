// @flow
import type { Media } from '../mediaFormatter/types';
import type { Address, MultiLanguagePlace } from '../addressFormatter/types';
import type { Lister } from '../listerFormatter/types';
import type { Organisation } from '../organisationFormatter/types';
import type { Price } from '../listingPriceFormatter/types';
import type { Attributes } from '../listingAttributeFormatter/types';

export type BannerSponsorship = {
  link?: string,
  title?: string,
};

export type Features = {
  description: string,
  title: string,
  media: Media,
};

export type Listing = {
  address?: Address,
  attributes: Attributes,
  banner?: BannerSponsorship,
  channels?: Array<string>,
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
  logo?: Media,
  medias?: Array<Media>,
  multilanguagePlace?: MultiLanguagePlace,
  organisations?: Array<Organisation>,
  price?: Price,
  prices?: Array<Price>,
  promotion?: string,
  propertyType?: string,
  shareLink?: string,
  subtitle?: string,
  tier?: number,
  title: string,
  totalUnits?: string,
  unitTypeCategory?: string,
  updatedAt?: string,
  youtubeIds?: Array<string>,
};
