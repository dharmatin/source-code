// @flow
import listingCore from '../dao/listings';
import { formatterProjectProfile } from './formatters/projectProfileFormatter';
import { formatterSuggestionProjects } from './formatters/suggestionProjectFormatter';
import { formatterMultiLanguageAmenities } from './formatters/amenitiesFormatter';

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

    return formatterProjectProfile(
      result.response,
      childListingResult.response,
      lang
    );
  }

  async getProjectByOrganisation(
    organisationId: string,
    excludeProjectId: string,
    lang: string
  ): Object {
    const result = await this.listings.searchProjectByOrganisation(
      organisationId,
      excludeProjectId
    );
    const status = result.responseHeader.status;
    if (status !== 0) {
      throw new Error('Solr search error!');
    }

    return formatterSuggestionProjects(result.response, lang);
  }

  async getAmenitiesById(id: string, lang: string): Object {
    const result = await this.listings.searchProjectAccessByProjectId(id);
    const status = result.responseHeader.status;
    if (status !== 0) {
      throw new Error('Solr get amenities not found');
    }

    return formatterMultiLanguageAmenities(result.response, lang);
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