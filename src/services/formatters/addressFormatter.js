// @flow
import _ from 'lodash';

export const getAddressInfo = (area: Object): Object => {
  const responseAddress = {}; 
  const {district, city, province, address, mapCoordinate} = area;
  let formattedAddress = '';

  if (!_.isNil(address)) formattedAddress += address + ', ';
  formattedAddress += district + ', ';
  formattedAddress += city + ', ';
  formattedAddress += province;

  responseAddress.formattedAddress = formattedAddress;

  let coordinate = {};
  if (!_.isNil(mapCoordinate)) {
    const [lat, lng] = mapCoordinate;

    if (lat !== '0.0000000000' && lng !== '0.0000000000') {
      responseAddress.lat = lat;
      responseAddress.lng = lng;
    }
  }

  return {address: responseAddress};
};

export const getMultiLanguageAddressInfo = (area: Object): Object => {
  const levelLocation = {
    level1: !_.isNil(area.province) ? area.province : '',
    level2: !_.isNil(area.city) ? area.city : '',
    level3: !_.isNil(area.district) ? area.district : ''
  };

  const response = {
    multilanguagePlace: {
      'en-GB': levelLocation,
      'id-ID': levelLocation
    }
  };

  return response;
};
