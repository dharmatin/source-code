import _ from 'lodash';
import type { AddressRequest, Address, MultiLanguagePlace, PlaceLevel } from './type';

const formatAddress = (request: AddressRequest): Address => {
  let formattedAddress = {
    formattedAddress: `${request.district}, ${request.city}`,
  };

  if (request.gmapLevel > 0) {
    formattedAddress.lng = request.lng;
    formattedAddress.lat = request.lat;
  }

  if (_.isEqual(request.gmapLevel, 1)) formattedAddress.hideMarker = true;

  return formattedAddress;
};

export const formatMultiLanguagePlace = (request: AddressRequest): MultiLanguagePlace => {
  return {
    'id-ID': placeLevel(request),
    'en-GB': placeLevel(request)
  };
};

const placeLevel = (request: AddressRequest): PlaceLevel => {
  return {
    level1: request.province,
    level2: request.city,
    level3: request.district
  };
};

export default formatAddress;
