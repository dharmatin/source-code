// @flow
import listingCore from '../dao/listings';
import { formatProjectProfile } from './formatters/projectProfileFormatter';
import { formatSuggestionProjects } from './formatters/suggestionProjectFormatter';
import { formatMultiLanguageAmenities } from './formatters/amenitiesFormatter';

export class ListingService {
  listings: Object;

  constructor(listings: Object) {
    this.listings = listings;
  }

  async getProjectProfile(id: string): Object {
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

    return formatProjectProfile(
      result.response,
      childListingResult.response
    );
  }

  async getProjectByOrganisation(
    organisationId: string,
    excludeProjectId: string
  ): Object {
    const result = await this.listings.searchProjectByOrganisation(
      organisationId,
      excludeProjectId
    );
    const status = result.responseHeader.status;
    if (status !== 0) {
      throw new Error('Solr search error!');
    }

    return formatSuggestionProjects(result.response);
  }

  async getAmenitiesById(id: string): Object {
    const result = await this.listings.searchProjectAccessByProjectId(id);
    const status = result.responseHeader.status;
    if (status !== 0) {
      throw new Error('Solr get amenities not found');
    }

    return formatMultiLanguageAmenities(result.response);
  }

  async getOneProjectByid(id: string, lang: string): Object {
    const result = await this.listings.searchProjectByid(id);
    const status = result.responseHeader.status;
    if (status !== 0) {
      throw new Error('Solr search error !');
    }

    return {listings: result.response.docs};
  }
}

export default new ListingService(listingCore);