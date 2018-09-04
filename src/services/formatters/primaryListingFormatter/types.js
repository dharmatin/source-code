// @flow
import type { Media } from '../mediaFormatter/types';
import type { Price } from '../listingPriceFormatter/types';
import type { Address, MultiLanguagePlace } from '../addressFormatter/types';
import type { Attributes } from '../listingAttributeFormatter/types';
import type { Organisation } from '../organisationFormatter/types';
import type { BannerSponsorship } from '../listingFormatter/types';

export type PrimaryListing = {
  channel: Array<string>,
  kind: string,
  id: string,
  shareLink: string,
  title: string,
  subtitle: string,
  tier: number,
  propertyType: string,
  color?: string,
  prices: Array<Price>,
  cover: Media,
  medias: Array<Media>,
  youtubeIds: Array<string>,
  floorPlanImages: Array<Media>,
  logo: Media,
  description: string,
  updatedAt: string,
  address: Address,
  multilanguagePlace: MultiLanguagePlace,
  active: boolean,
  website: string,
  attributes: Attributes,
  organisations: Array<Organisation>,
  banner: BannerSponsorship,
};
