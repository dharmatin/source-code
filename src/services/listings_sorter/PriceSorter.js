import type { ISortListing } from '../ISortListing';
import searchDao from '../../dao/search';
import type { RequestQueryParameters } from '../../dao/search/type';

export default class PriceSorter implements ISortListing {
  async searchAndSort(
    direction: string,
    queryParameters: RequestQueryParameters
  ): Array<Object> {
    const result = await searchDao.searchAndSort(
      'price',
      direction,
      queryParameters
    );
    console.log('Result', result);
    return [{}];
  }
}
