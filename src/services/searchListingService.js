// @flow
import searchDao from '../dao/search';
import areaDao from '../dao/area';
import _ from 'lodash';
import formatter from './formatters/primaryListingFormatter';
import SortListingFactory from './sortListingsFactory';
import { formatMultiLanguageAddressInfo } from './formatters/addressFormatter';

export class SearchListingService extends formatter {
  search: Object;

  constructor(search: Object) {
    super();
    this.search = search;
  }

  async getListingList(body: Object, query: Object): Object {
    const sortBy = _.isUndefined(body.sortBy) ?
      'default' :
      _.toLower(body.sortBy);
    const listingList = await SortListingFactory.searchAndSort(sortBy, {
      body: body,
      query: query,
    });

    const nextPage = (query.nextPageToken * query.pageSize >=
    listingList.numFound ?
      query.nextPageToken :
      parseInt(query.nextPageToken) + 1
    ).toString();
    const formattedItems =
      _.size(listingList.items) > 0 ?
        this.primaryListingFormatter(listingList.items) :
        [];
    const multilanguagePlaces = await this.getMultilanguagePlaces(
      formattedItems,
      body
    );
    return {
      nextPageToken: nextPage,
      totalCount: listingList.numFound,
      items: formattedItems,
      multilanguagePlaces: multilanguagePlaces,
    };
  }

  async getMultilanguagePlaces(
    listingItems: Array<Object>,
    body: Object
  ): Promise<Array<Object>> {
    const { places, placeIds } = body;
    let area = [];
    if (_.isEmpty(places) && _.isEmpty(placeIds)) {
      return [];
    }
    if (!_.isEmpty(places)) {
      const { response: { docs } } = await areaDao.findByLevel(places[0]);
      area = docs;
    }

    if (!_.isEmpty(placeIds) && _.size(placeIds) > 1) {
      const { response: { docs } } = await areaDao.findByPlaceIds(placeIds);
      area = docs;
    }

    return _.map(area, (value: Object): any =>
      formatMultiLanguageAddressInfo(
        _.omitBy(value, (v: any): any => v === '-'),
        { shouldShowPlaceId: true }
      )
    );
  }
}

export default new SearchListingService(searchDao);
