// @flow

export type Lister = {
  name: string,
  firstName: string,
  profilePage: string,
  membership: string,
  photoUrl: string,
  email: string
};

export type Project = {
  name: string,
  srcImage: string,
  priceRange: string,
  provinceName: string,
  cityName: string,
  districtName: string,
  urlReferral: string,
  subUnitType: string,
  builtUp: string,
  grossArea: string
};

export type Organisation = {
  name: string,
  urlPage: string,
  phoneNumber: string,
  whatsappNumber: string,
  email: string,
  logo: string
};
