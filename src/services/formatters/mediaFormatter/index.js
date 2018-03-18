// @flow
import _ from 'lodash';
import type { Media } from './types';
import config from '../../../config';
import { getYoutubeId } from '../../../libs/utility';

export const formatFloorPlanImages = (
  floorPlansWithDescription: Array<string>
): Array<Media> => {
  const floorPlanImages = [];
  _.map(floorPlansWithDescription, item => {
    const floorPlan = {};
    const [img, description] = _.split(item, ';');
    floorPlan.type = 'image';
    floorPlan.urlTemplate =
      config.image.sharpieUrl +
      '/premium/${width}x${height}-${scale}/' +
      _.trim(img, '"');
    floorPlan.description = description;

    floorPlanImages.push(floorPlan);
  });

  return floorPlanImages;
};

export const formatImageCover = (image: string): Media => {
  return {
    type: 'image',
    urlTemplate:
      config.image.sharpieUrl + '/premium/${width}x${height}-${scale}/' + image,
  };
};

export const formatListingImages = (
  imagesWithDescription: Array<string>
): Array<Media> => {
  const medias = [];

  _.map(imagesWithDescription, item => {
    const image = {};
    const [img, description] = _.split(item, ';');
    image.type = 'image';
    image.urlTemplate =
      config.image.sharpieUrl +
      '/premium/${width}x${height}-${scale}/' +
      _.trim(img, '"');
    if (!_.isEmpty(description)) {
      image.description = description;
    }

    medias.push(image);
  });

  return medias;
};

export const formatThreeSixtyVideos = (
  threeSixtyLinks: Array<string>
): Array<string> => {
  const image360s = [];

  _.map(_.compact(threeSixtyLinks), item => {
    const [url, description] = _.split(item, ';');
    image360s.push(url);
  });

  return image360s;
};

export const formatYoutubeIds = (
  youtubeLinks: Array<string>
): Array<string> => {
  const youtubeIds = [];

  _.map(_.compact(youtubeLinks), item => {
    const [url, description] = _.split(item, ';');
    youtubeIds.push(getYoutubeId(url));
  });

  return youtubeIds;
};

export const formatLogo = (logo: string, baseUrl: string): Media => {
  const response = {
    type: 'image',
    url: baseUrl + '/' + logo,
  };

  return response;
};
