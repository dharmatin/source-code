import listingCore from '../dao/listings';
import projectProfileFormatter from './projectProfilePage/formatters';
import {notFoundFormatter} from './invalidResponse/formatters/invalidResponseFormatter';

export class ListingService {
  constructor(listings) {
    this.listings = listings;
  }

  async getListingForPPP(id, lang) {
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
    if (result.response.numFound === 0) {
      //return notFoundFormatter(); 
      return {};
    }
    return projectProfileFormatter(result.response, childListingResult.response, lang);
  }
}

export default new ListingService(listingCore);
