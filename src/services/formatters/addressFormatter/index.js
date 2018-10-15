// @flow
import _ from 'lodash';
import type { Address, MultiLanguagePlace } from './types';

export const formatAddressInfo = (area: Object): Address => {
  const addressInfo = {};
  const { address, city, district, geoCoordinate, province } = area;
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
      addressInfo.lat = parseFloat(lat);
      addressInfo.lng = parseFloat(lng);
    }
  }

  return addressInfo;
};

export const formatMultiLanguageAddressInfo = (
  area: Object,
  options: Object = {}
): MultiLanguagePlace => {
  const shouldShowPlaceId = _.get(options, 'shouldShowPlaceId');
  const levelLocation = {
    level1: area.province,
    level2: area.city,
    level3: area.district,
  };

  return {
    placeId: shouldShowPlaceId ? area.placeId : undefined,
    'en-GB': levelLocation,
    'id-ID': levelLocation,
  };
};
