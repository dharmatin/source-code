// @flow
import _ from 'lodash';
import type {Media} from './types';
import config from '../../../config';

export const getFloorPlanImages = (floorPlansWithDescription: Array<string>): Array<Media> => {
  const floorPlanImages = [];
  const floorPlan = {};

  _.map(floorPlansWithDescription, (item) => {
    const [description, img] = _.split(item, ';');
    floorPlan.type = 'image';
    floorPlan.urlTemplate = config.image.sharpieUrl + '/premium/${width}x${height}-${scale}/' + _.trim(img, '"');
    floorPlan.description = description;

    floorPlanImages.push(floorPlan);
  });

  return floorPlanImages;
};

export const getImageCover = (image: string): Media => {
  return {
    type: 'image',
    urlTemplate: config.image.sharpieUrl + '/premium/${width}x${height}-${scale}/' + image
  };
};

export const getListingImages = (imagesWithDescription: Array<string>): Array<Media> => {
  const medias = [];

  const image = {
    type: '',
    urlTemplate: '',
    description: ''
  };

  _.map(imagesWithDescription, (item) => {
    const [description, img] = _.split(item, ';');
    image.type = 'image';
    image.urlTemplate = config.image.sharpieUrl + '/premium/${width}x${height}-${scale}/' + _.trim(img, '"');
    image.description = description;

    medias.push(image);
  });

  return medias;
};

export const getThreeSixtyVideos = (threeSixtyLinks: Array<string>): Array<string> => {
  const image360s = [];

  _.map(_.compact(threeSixtyLinks), (item) => {
    const [description, url] = _.split(item, ';');
    image360s.push(url);
  });

  return image360s;
};

export const getYoutubeIds = (youtubeLinks: Array<string>): Array<string> => {
  const youtubeIds = [];

  _.map(_.compact(youtubeLinks), (item) => {
    const [description, url] = _.split(item, ';');
    youtubeIds.push(url);
  });

  return youtubeIds;
};

export const getLogo = (logo: string, baseUrl: string): Media => {
  const response = {
    type: 'image',
    url: baseUrl + '/' + logo
  };

  return response;
};
