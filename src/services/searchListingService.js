// @flow
import searchDao from '../dao/search';
import _ from 'lodash';
import formatter from './formatters/primaryListingFormatter';
import SortListingFactory from './sortListingsFactory';

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

    return {
      nextPageToken: nextPage,
      totalCount: _.size(listingList.items),
      items: this.primaryListingFormatter(listingList.items),
    };
  }
}

export default new SearchListingService(searchDao);
