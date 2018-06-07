// @flow
import _ from 'lodash';
import type { Media, MediaRequest } from './type';
import config from '../../../../../config';
import { extractListingId, getYoutubeId } from '../../../../../libs/utility';
import { unserialize } from 'php-serialization';

const formatMedia = (request: MediaRequest): Array<Media> => {
  return formatImageList(request.images);
};

const formatImageList = (image: string): Array<Media> => {
  const images = _.map(unserialize(image).__attr__, (attribute: Object): Array<string> => {
    return attribute.val;
  });
  return _.map(images, (image: string): Media => {
    return {
      type: 'image',
      url: getImageUrl(image),
      thumbnailUrl: getThumbnailImageUrl(image),
      urlTemplate: getSharpieImageUrl(image)
    };
  });
};
export const formatCoverImage = (image: string): Media => {
  return {
    type: 'image',
    url: getImageUrl(image),
    urlTemplate: getSharpieImageUrl(image)
  };
};

const getS3ImageListingPath = (listingId: string, image: string, pathType: string = ''): string => {
  const extractedListingId = extractListingId(listingId);
  return `/${config.PROPERTY_TYPE[extractedListingId.type]}/${extractedListingId.type}${(extractedListingId.id).substr(0, 2)}/${extractedListingId.id}/${!_.isEmpty(pathType) ? `${pathType}/` : ''}${image}`;
};

const getListingIdFromImage = (image: string): string => {
  const imagePart: Array<string> = image.split('-');
  return imagePart[0];
};

const getImageUrl = (image: string): string => {
  const listingId = getListingIdFromImage(image);
  return `${config.image.baseUrl}${getS3ImageListingPath(listingId, image)}`;
};

const getThumbnailImageUrl = (image: string): string => {
  const listingId = getListingIdFromImage(image);
  return `${config.image.baseUrl}${getS3ImageListingPath(listingId, image, 'thumbnail')}`;
};

const getSharpieImageUrl = (image: string): string => {
  const listingId = getListingIdFromImage(image);
  return `${config.image.sharpieUrl}/\${width}x\${height}-\${scale}${getS3ImageListingPath(listingId, image, 'original')}`;
};

export const getYoutubeIds = (serializeVideo: string): Array<string> => {
  const videos = _.map(unserialize(serializeVideo).__attr__, (attribute: Object): Array<string> => {
    return attribute.val;
  });
  return _.map(videos, (youtubeUrl: string): string => {
    return getYoutubeId(youtubeUrl);
  });
};

export default formatMedia;
