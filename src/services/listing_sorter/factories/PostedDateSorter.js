import type { ISortListing } from './interfaces/ISortListing';
import searchDao from '../../../dao/search/index';
import type { RequestQueryParameters } from '../../../dao/search/type';

export default class PostedDateSorter implements ISortListing {
  async searchAndSort(
    direction: string,
    queryParameters: RequestQueryParameters
  ): Array<Object> {
    const result = await searchDao.defaultSearchAndSort(
      queryParameters,
      'posted',
      direction
    );
    return result;
  }
}
