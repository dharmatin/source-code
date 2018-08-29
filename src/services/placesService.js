// @flow
import placesDao from '../dao/places';
import formatter from './formatters/placesFormatter';

export class PlacesService extends formatter {
  places: Object;

  constructor(places: Object) {
    super();
    this.places = places;
  }

  async getExplorePopularLocationList(): Object {
    const dataResult = await this.places.getDataExplorePopularLocation();

    return {
      items: this.formatExplorePopularLocation(dataResult),
      totalCount: 0,
    };
  }
}

export default new PlacesService(placesDao);
