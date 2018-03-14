// @flow
import listingCore from '../dao/listings';
import { formatProjectProfile } from './formatters/projectProfileFormatter';
import { formatSuggestionProjects } from './formatters/suggestionProjectFormatter';
import { formatMultiLanguageAmenities } from './formatters/amenitiesFormatter';
import ListerService from './listerService';

export class ListingService {
  listings: Object;

  constructor(listings: Object) {
    this.listings = listings;
  }

  async getProjectProfile(param: Object): Object {
    const result = await this.listings.searchProject(param.id);
    const status = result.responseHeader.status;
    if (status !== 0) {
      throw new Error('Solr search error!');
    }

    const childListingResult = await this.listings.searchChildListing(param.id);
    const childListingStatus = result.responseHeader.status;
    if (childListingStatus !== 0) {
      throw new Error('Solr search Child listing error!');
    }

    const lister = await ListerService.getListerProfile(param.listerId);

    return formatProjectProfile(
      result.response,
      childListingResult.response,
      lister
    );
  }

  async getProjectByOrganisation(
    organisationId: string,
    excludeProjectId: string,
    pagingRequest: Object
  ): Object {
    
    const result = await this.listings.searchProjectByOrganisation(
      organisationId,
      excludeProjectId,
      pagingRequest,
    );

    const status = result.responseHeader.status;
    if (status !== 0) {
      throw new Error('Solr search error!');
    }

    return formatSuggestionProjects(result.response, pagingRequest);
  }

  async getAmenitiesById(id: string): Object {
    const result = await this.listings.searchProjectAccessByProjectId(id);
    const status = result.responseHeader.status;
    if (status !== 0) {
      throw new Error('Solr get amenities not found');
    }

    return formatMultiLanguageAmenities(result.response);
  }
}

export default new ListingService(listingCore);
