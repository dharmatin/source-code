// @flow

export type coverImage = {
  type: string,
  url: string,
  urlTemplate: string,
};

export type ExplorePopularLocation = {
  level1: string,
  level2?: string,
  level3?: string,
  slugId: string,
  cover?: coverImage,
};

export type PopularPlaces = {
  level1: string,
  level2: string,
  slugId: string,
};
