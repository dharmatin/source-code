import _ from 'lodash';

export class Address {
  getAddress(pdpSolr, withMapCoordinate = false) {
    const response = {
      address: {
        formattedAddress: pdpSolr.district_name + ', ' + pdpSolr.city_name + ', ' + pdpSolr.province_name
      }
    };

    if (withMapCoordinate === true) {
      const splitCoordinate = _.split(pdpSolr.latlng, ',');
      const mapCoordinate = {
        lat: !_.includes('0.0000000000', splitCoordinate[0]) ? splitCoordinate[0] : null,
        lng: !_.includes('0.0000000000', splitCoordinate[1]) ? splitCoordinate[1] : null
      };

      _.merge(response.address, mapCoordinate);
    }

    return response;
  }

  getDeveloperAddress(pdpSolr) {
    
  }

  getMultiLanguageAddress(pdpSolr) {
    const levelLocation = {
      level1: !_.isNil(pdpSolr.province_name) ? pdpSolr.province_name : '',
      level2: !_.isNil(pdpSolr.city_name) ? pdpSolr.city_name : '',
      level3: !_.isNil(pdpSolr.district_name) ? pdpSolr.district_name : ''
    }

    const response = {
      multilanguagePlace: {
        "en-GB": levelLocation,
        "id-ID": levelLocation
      }
    }

    return response;
  }
}

export default new Address();
