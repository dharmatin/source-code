// @flow
import _ from 'lodash';
import placesDao from '../dao/places';
import formatter from './formatters/placesFormatter';

export class PlacesService extends formatter {
  places: Object;

  constructor(places: Object) {
    super();
    this.places = places;
  }

  async getExplorePopularLocationList(options: Object): Object {
    const dataResult = await this.places.getDataExplorePopularLocation();
    const formatPopularLocations = this.formatExplorePopularLocation(
      dataResult,
      options
    );
    return {
      items: formatPopularLocations,
      totalCount: _.size(formatPopularLocations),
    };
  }

  async getPopularPlacesList(): Object {
    const dataResult = await this.places.getDataPopularPlaces();
    const formatPopularPlaces = this.formatPopularPlaces(dataResult);
    return {
      items: formatPopularPlaces,
      totalCount: _.size(formatPopularPlaces),
    };
  }
}

export default new PlacesService(placesDao);
