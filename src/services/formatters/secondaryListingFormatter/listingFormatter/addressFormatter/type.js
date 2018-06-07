// @flow

export type Address = {
  formattedAddress: string,
  lng?: number,
  lat?: number,
  hideMarker?: boolean
};

export type PlaceLevel = {
  level1: string,
  level2: string,
  level3: string
};

export type MultiLanguagePlace = {
  'id-ID': PlaceLevel,
  'en-GB': PlaceLevel
};

export type AddressRequest = {
  city: string,
  district: string,
  province: string,
  gmapLevel?: number,
  lng?: number,
  lat?: number
};
