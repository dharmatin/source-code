import _ from 'lodash';

export function getAddress(area) {
  const response = {};
  const address = {
    formattedAddress: ''
  };

  if (!_.isNil(area.address)) {
    address.formattedAddress += area.address + ', ';
  }

  if (!_.isNil(area.district)) {
    address.formattedAddress += area.district + ', ';
  }

  if (!_.isNil(area.city)) {
    address.formattedAddress += area.city + ', ';
  }

  if (!_.isNil(area.province)) {
    address.formattedAddress += area.province + ', ';
  }

  if (!_.isEmpty(address)) address.formattedAddress = _.trim(address.formattedAddress, ', ');

  response.address = address;

  if (!_.isNil(area.mapCoordinate)) {
    const mapCoordinate = {
      lat: area.mapCoordinate[0] === '0.0000000000' ? null : area.mapCoordinate[0],
      lng: area.mapCoordinate[1] === '0.0000000000' ? null : area.mapCoordinate[1]
    };
    _.merge(response.address, mapCoordinate);
  }
  return response;
}

export function getMultiLanguageAddress(area) {
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
