// @flow
import type { Videos } from './types';
import _ from 'lodash';

export const formatFeaturedVideo = (featuredVideos: any): Videos => {
  const response = {};
  if (!_.isEmpty(featuredVideos)) {
    response.totalCount = _.size(featuredVideos.data);
    response.items = featuredVideos.data;
  }
  return response;
};
