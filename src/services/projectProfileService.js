// @flow
import listingCore from '../dao/listings';
import {formatterProjectProfile} from './formatters/projectProfileFormatter';
import {formatterSuggestionProjects} from './formatters/suggestionProjectFormatter';

export class ListingService {
  listings: Object;

  constructor(listings: Object) {
    this.listings = listings;
  }

  async getProjectProfile(id: string, lang: string): Object {
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

    return formatterProjectProfile(result.response, childListingResult.response, lang);
  }

  async searchProjectByOrganisation(organisationId: string, excludeProjectId: string, lang: string): Object {
    const result = await this.listings.searchProjectByOrganisation(organisationId, excludeProjectId);
    const status = result.responseHeader.status;
    if (status !== 0) {
      throw new Error('Solr search error!');
    }

    return formatterSuggestionProjects(result.response, lang);
  }
}

export default new ListingService(listingCore);
