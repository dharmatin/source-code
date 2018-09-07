// @flow
import constants from '../config/constants';
import PriceSorter from './listing_sorter/factories/PriceSorter';
import DefaultSorter from './listing_sorter/factories/DefaultSorter';
import type { RequestQueryParameters } from '../dao/search/type';

export default class SortListingFactory {
  static async searchAndSort(
    sortBy: string,
    queryParameters: RequestQueryParameters
  ): Promise<Array<Object>> {
    let listings: Array<Object> = [];
    switch (sortBy) {
    case 'price-asc':
      listings = await new PriceSorter().searchAndSort(
        constants.SORTING.ASCENDING,
        queryParameters
      );
      break;
    case 'price-desc':
      listings = await new PriceSorter().searchAndSort(
        constants.SORTING.DESCENDING,
        queryParameters
      );
      break;
    default:
      listings = await new DefaultSorter().searchAndSort(
        constants.SORTING.ASCENDING,
        queryParameters
      );
      break;
    }
    return listings;
  }
}
