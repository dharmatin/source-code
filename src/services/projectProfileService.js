import listingCore from '../dao/listings';
import {getProjectProfileFormatter} from './formatters/projectProfileFormatter';

export class ListingService {
  constructor(listings) {
    this.listings = listings;
  }

  async getProjectProfile(id, lang) {
    const result = await this.listings.searchProject(id);
    const status = result.responseHeader.status;
    if (status !== 0) {
      throw new Error('Solr search error!');
    }

    const childListingResult = await this.listings.searchChildListing(id);
    const childListingStatus = result.responseHeader.status;
    if (childListingStatus !== 0) {
      throw new Error('Solr search Child listing error!');
    }

    return getProjectProfileFormatter(result.response, childListingResult.response, lang);
  }
}

export default new ListingService(listingCore);
