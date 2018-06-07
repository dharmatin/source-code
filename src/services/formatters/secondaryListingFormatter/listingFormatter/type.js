// @flow

import type { Price } from './priceFormatter/type';
import type { Media } from './mediaFormatter/type';
import type { Banner } from './generalFormatter/type';
import type { Address, MultiLanguagePlace } from './addressFormatter/type';
import type { Attribute } from './attributeFormatter/type';
import type { Lister } from '../listerFormatter/type';

export type Listing = {
  channels: Array<string>,
  kind: string,
  id: string,
  title: string,
  shareLink: string,
  propertyType: string,
  tier: number,
  transacted?: boolean,
  prices: Array<Price>,
  cover: Media,
  medias?: Array<Media>,
  youtubeIds?: Array<string>,
  banner?: Banner,
  description?: string,
  updatedAt: string,
  address: Address,
  multilanguagePlace: MultiLanguagePlace,
  featureDescription?: string,
  attributes: Attribute,
  listers: Array<Lister>,
  organisations?: Array<Lister>,
  subTitle?: string
};

export type RangeTolerance = {
  min: number,
  max: number
};

export type SimilarityCriteria = {
  listingId: string,
  price: RangeTolerance,
  landSize: RangeTolerance,
  builtUp: RangeTolerance,
  propertyType: string,
  province: number,
  city: number,
  district: number,
  listerId: number
};

export type SearchResponse = {
  totalCount: number,
  items: Array<Listing>
};
