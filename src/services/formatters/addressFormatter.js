import _ from 'lodash';

export const getAddressInfo = area => {
  const {district, city, province, address, mapCoordinate} = area;
  let formattedAddress = '';

  if (!_.isNil(address)) formattedAddress += address + ', ';
  formattedAddress += district + ', ';
  formattedAddress += city + ', ';
  formattedAddress += province;

  let coordinate = {};
  if (!_.isNil(mapCoordinate)) {
    const [lat, lng] = mapCoordinate;

    if (lat !== '0.0000000000' && lng !== '0.0000000000') {
      coordinate.lat = lat;
      coordinate.lng = lng;
    }

    if (_.isEmpty(coordinate)) coordinate = null;
  }

  return {address: { formattedAddress }};
};

export const getMultiLanguageAddressInfo = area => {
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
