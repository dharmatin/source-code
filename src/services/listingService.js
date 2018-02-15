import listingCore from '../dao/listings';
import pdpFormatResponse from '../libs/pdpResponse';

export class ListingService {
  constructor(listingCollection) {
    this.listingCollection = listingCollection;
  }

  async getListings(id, lang) {
    const result = await this.listingCollection.search(id);
    const status = result.responseHeader.status;
    if (status !== 0) {
      throw new Error('Solr search error!');
    }
    return pdpFormatResponse(result.response, lang);
  }
}

export default new ListingService(listingCore);
