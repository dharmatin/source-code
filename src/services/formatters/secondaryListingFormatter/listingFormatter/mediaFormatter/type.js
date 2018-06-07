// @flow

export type Media = {
  type?: string,
  url?: string,
  thumbnailUrl?: string,
  urlTemplate: string
};

export type MediaRequest = {
  videos: string,
  images: string
};
