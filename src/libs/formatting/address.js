import _ from 'lodash';

export function getAddressInfo(area) {
  const response = {};
  const {district, city, province, address, mapCoordinate} = area;

  let formattedAddress = '';
  if (!_.isNil(address)) formattedAddress += address + ', ';
  formattedAddress += district + ', ';
  formattedAddress += city + ', ';
  formattedAddress += province;

  response.address = {formattedAddress: formattedAddress};

  if (!_.isNil(mapCoordinate)) {
    const coordinate = {};
    const [lat, lng] = mapCoordinate;

    if (lat !== '0.0000000000') coordinate.lat = lat;
    if (lng !== '0.0000000000') coordinate.lng = lng;

    _.merge(response.address, coordinate);
  }

  return response;
}

export function getMultiLanguageAddressInfo(area) {
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
}
