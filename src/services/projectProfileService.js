// @flow
import listingCore from '../dao/listings';
import { formatProjectProfile } from './formatters/projectProfileFormatter';
import { formatSuggestionProjects } from './formatters/suggestionProjectFormatter';
import { formatMultiLanguageAmenities } from './formatters/amenitiesFormatter';
import ReferralListerService from './referralListerService';
import ListerService from './listerService';
import _ from 'lodash';

export class ListingService {
  listings: Object;

  constructor(listings: Object) {
    this.listings = listings;
  }

  async getChildListings(parentId: string): Object {
    const result = await this.listings.searchChildListing(parentId);
    const status = result.responseHeader.status;
    if (status !== 0) {
      throw new Error('Solr search Child listing error!');
    }

    return result;
  }

  async getListings(listingId: string): Object {
    const result = await this.listings.searchProject(listingId);
    const status = result.responseHeader.status;
    if (status !== 0) {
      throw new Error('Solr search listing error!');
    }

    return result;
  }

  async getProjectProfile(param: Object): Object {
    let childListingResult = {};
    let lister = {};
    let listing = {}; 

    const result = await this.getListings(param.id);
    if (!_.isEmpty(result.response.docs[0])) {
      listing = result.response;
      childListingResult = await this.getChildListings(param.id);

      if (Boolean(result.response.docs[0].is_referral)) {
        let dataReferral = {};
        if (param.referralCode !== '') {
          dataReferral = await ReferralListerService.getListerByReferralCode(param.referralCode, listing.docs[0].id);
          
          if (!_.isNil(dataReferral)) {
            lister = await ListerService.getListerProfile(dataReferral.userId);
          }
        }
      }
    }

    return formatProjectProfile(
      listing,
      childListingResult,
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
      pagingRequest
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
