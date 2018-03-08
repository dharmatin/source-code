// @flow
import _ from 'lodash';
import type {Address, MultiLanguagePlace} from './types';

export const formatterAddressInfo = (area: Object): Address => {
  const addressInfo = {};
  const {address, city, district, geoCoordinate, province} = area;
  let formattedAddress = '';

  if (!_.isNil(address)) {
    formattedAddress += address + ', ';
  }

  formattedAddress += district + ', ';
  formattedAddress += city + ', ';
  formattedAddress += province;

  addressInfo.formattedAddress = formattedAddress;

  if (!_.isNil(geoCoordinate)) {
    const [lat, lng] = geoCoordinate;

    if (lat !== '0.0000000000' && lng !== '0.0000000000') {
      addressInfo.lat = lat;
      addressInfo.lng = lng;
    }
  }

  return addressInfo;
};

export const formatterMultiLanguageAddressInfo = (area: Object): MultiLanguagePlace => {
  const levelLocation = {
    level1: area.province,
    level2: area.city,
    level3: area.district
  };

  return {
    'en-GB': levelLocation,
    'id-ID': levelLocation
  };
};
