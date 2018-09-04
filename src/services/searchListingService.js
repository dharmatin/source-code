// @flow
import searchDao from '../dao/search';
import _ from 'lodash';
import formatter from './formatters/primaryListingFormatter';

export class SearchListingService extends formatter {
  search: Object;

  constructor(search: Object) {
    super();
    this.search = search;
  }

  async getListingList(body: Object, query: Object): Object {
    const listingList = await this.search.searchListing(body, query);
    return {
      nextPageToken: _.toNumber(query.nextPageToken),
      totalCount: _.size(listingList),
      items: this.primaryListingFormatter(listingList),
    };
  }
}

export default new SearchListingService(searchDao);
