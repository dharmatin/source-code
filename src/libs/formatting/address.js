import _ from 'lodash';

function getAddress(param, withMapCoordinate = false) {
  const response = {
    address: {
      formattedAddress: param.district_name + ', ' + param.city_name + ', ' + param.province_name
    }
  }

  if (withMapCoordinate === true) {
    let mapCoordinate = {
      lng: '',
      lat: ''
    };

    const coordinate = _.split(mapCoordinate);
    console.log(coordinate);
    mapCoordinate = coordinate;

    console.log(mapCoordinate);
    _.merge(response.address, mapCoordinate);
  }
  
  return response;
}

function multiLanguageAddress() {

}

module.exports = getAddress;
