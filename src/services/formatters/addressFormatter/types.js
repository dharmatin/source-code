// @flow
export type Address = {
  formattedAddress: string,
  lat?: number,
  lng?: number,
};

export type PlaceLevel = {
  level1: string,
  level2: string,
  level3: string,
};

export type MultiLanguagePlace = {
  'en-GB': PlaceLevel,
  'id-ID': PlaceLevel,
};
