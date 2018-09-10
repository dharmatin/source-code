import type { ISortListing } from './interfaces/ISortListing';
import searchDao from '../../../dao/search/index';
import type { RequestQueryParameters } from '../../../dao/search/type';

export default class LandSizeSorter implements ISortListing {
  async searchAndSort(
    direction: string,
    queryParameters: RequestQueryParameters
  ): Array<Object> {
    const result = await searchDao.searchAndSort(
      queryParameters,
      'landSize',
      direction
    );

    return result;
  }
}
