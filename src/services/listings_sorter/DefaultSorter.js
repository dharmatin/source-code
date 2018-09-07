import type { ISortListing } from '../ISortListing';
import searchDao from '../../dao/search';
import type { RequestQueryParameters } from '../../dao/search/type';

export default class DefaultSorter implements ISortListing {
  async searchAndSort(
    direction: string,
    queryParameters: RequestQueryParameters
  ): Array<Object> {
    const result = await searchDao.defaultSearchAndSort(queryParameters);
    return result;
  }
}
