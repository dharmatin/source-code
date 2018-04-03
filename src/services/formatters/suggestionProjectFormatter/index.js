// @flow
import _ from 'lodash';
import type { SuggestionProject } from './types';
import * as projectFormatter from '../projectProfileFormatter';

export const formatSuggestionProjects = (
  projectListing: Object,
  pagingRequest: Object
): SuggestionProject => {
  if (projectListing.numFound === 0) {
    return {};
  } else if (projectListing.docs.length === 0) {
    return {
      totalCount: 0,
    };
  } else {
    return formatRelatedProjects(
      projectListing.docs,
      projectListing.numFound,
      pagingRequest
    );
  }
};

const formatRelatedProjects = (
  projectListings: Array<Object>,
  totalNumber: number,
  pagingRequest: Object
): SuggestionProject => {
  let response = {};
  let listings = [];
  _.map(projectListings, (listing: Object) => {
    const dataListing = projectFormatter.formatProject(listing, {});
    listings.push(dataListing);
  });
  response.items = listings;
  response.totalCount = totalNumber;

  if (
    pagingRequest.pageToken * pagingRequest.pageSize < totalNumber &&
    totalNumber > 1
  ) {
    response.nextPageToken = (pagingRequest.pageToken + 1).toString();
  }
  return response;
};
