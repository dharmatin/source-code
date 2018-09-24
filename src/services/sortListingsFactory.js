// @flow
import constants from '../config/constants';
import PriceSorter from './listing_sorter/factories/PriceSorter';
import DefaultSorter from './listing_sorter/factories/DefaultSorter';
import BuiltUpSorter from './listing_sorter/factories/BuiltUpSorter';
import LandSizeSorter from './listing_sorter/factories/LandSizeSorter';
import PostedDateSorter from './listing_sorter/factories/PostedDateSorter';
import PublishedDateSorter from './listing_sorter/factories/PublishedDateSorter';
import type { RequestQueryParameters } from '../dao/search/type';

export default class SortListingFactory {
  static async searchAndSort(
    sortBy: string,
    queryParameters: RequestQueryParameters
  ): Promise<Object> {
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
    case 'builtup-asc':
      listings = await new BuiltUpSorter().searchAndSort(
        constants.SORTING.ASCENDING,
        queryParameters
      );
      break;
    case 'builtup-desc':
      listings = await new BuiltUpSorter().searchAndSort(
        constants.SORTING.DESCENDING,
        queryParameters
      );
      break;
    case 'landarea-asc':
      listings = await new LandSizeSorter().searchAndSort(
        constants.SORTING.ASCENDING,
        queryParameters
      );
      break;
    case 'landarea-desc':
      listings = await new LandSizeSorter().searchAndSort(
        constants.SORTING.DESCENDING,
        queryParameters
      );
      break;
    case 'posted-asc':
      listings = await new PostedDateSorter().searchAndSort(
        constants.SORTING.ASCENDING,
        queryParameters
      );
      break;
    case 'posted-desc':
      listings = await new PostedDateSorter().searchAndSort(
        constants.SORTING.DESCENDING,
        queryParameters
      );
      break;
    case 'published-asc':
      listings = await new PublishedDateSorter().searchAndSort(
        constants.SORTING.ASCENDING,
        queryParameters
      );
      break;
    case 'published-desc':
      listings = await new PublishedDateSorter().searchAndSort(
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
