// @flow
import _ from 'lodash';
import type { Media } from './types';
import config from '../../../config';
import { getYoutubeId } from '../../../libs/utility';

export const formatFloorPlanImages = (
  floorPlansWithDescription: Array<string>
): Array<Media> => {
  const floorPlanImages = [];
  _.map(floorPlansWithDescription, (item: string) => {
    const floorPlan = {};
    const [img, description] = _.split(item, ';');
    if (!_.isEmpty(img)) {
      floorPlan.type = 'image';
      /* eslint-disable no-template-curly-in-string */
      floorPlan.urlTemplate =
        config.image.sharpieUrl +
        '/premium/${width}x${height}-${scale}/' +
        _.trim(img, '"');
      floorPlan.description = description;

      floorPlanImages.push(floorPlan);
    }
  });

  return floorPlanImages;
};

export const formatImageCover = (image: string): Media => {
  /* eslint-disable no-template-curly-in-string */
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

  _.map(imagesWithDescription, (item: string) => {
    const image = {};
    const [img, description] = _.split(item, ';');
    if (!_.isEmpty(img)) {
      const nestedImages = _.split(img, ',');

      if (nestedImages.length > 1) {
        _.map(nestedImages, (nestedImg: string) => {
          image.type = 'image';
          image.urlTemplate =
            config.image.sharpieUrl +
            '/premium/${width}x${height}-${scale}/' +
            _.trim(nestedImg, '"');

          /* eslint-disable no-template-curly-in-string */
          if (!_.isEmpty(description)) {
            image.description = description;
          }
        });
      } else {
        image.type = 'image';
        image.urlTemplate =
          config.image.sharpieUrl +
          '/premium/${width}x${height}-${scale}/' +
          _.trim(img, '"');

        /* eslint-disable no-template-curly-in-string */
        if (!_.isEmpty(description)) {
          image.description = description;
        }
      }

      medias.push(image);
    }
  });

  return medias;
};

export const formatThreeSixtyVideos = (
  threeSixtyLinks: Array<string>
): Array<string> => {
  const image360s = [];

  _.map(_.compact(threeSixtyLinks), (item: string) => {
    const [url] = _.split(item, ';');
    if (!_.isEmpty(url)) {
      image360s.push(url);
    }
  });

  return image360s;
};

export const formatYoutubeIds = (
  youtubeLinks: Array<string>
): Array<string> => {
  const youtubeIds = [];

  _.map(_.compact(youtubeLinks), (item: string) => {
    const [url] = _.split(item, ';');
    if (!_.isEmpty(url)) {
      youtubeIds.push(getYoutubeId(url));
    }
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
