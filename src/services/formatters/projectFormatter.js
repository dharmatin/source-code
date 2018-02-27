// @flow
import _ from 'lodash';
import config from '../../config/index';
import { toISOFormatting, slugify } from '../../libs/utility';

export const getGeneralInfo = (dataGeneral: Object) => {
  const {id, projectName, city, website, title, description, updatedAt} = dataGeneral;

  const response = {
    id: id,
    title: title,
    projectName: projectName,
    description: description,
    propertyType: dataGeneral.companyId === '0' ? 'Project' : dataGeneral.propertyType,
    updatedAt: toISOFormatting(updatedAt),
    shareLink: getProjectLink({
      projectName: projectName,
      city: city,
      id: id,
      lang: dataGeneral.lang
    })
  };

  if (!_.isEmpty(website)) {
    _.assign(response, {website: website});
  }

  return response;
};

export const getAttributesInfo = (dataAttributes: any) => {
  const attributes = {};

  attributes.totalUnits = dataAttributes.totalUnits;
  attributes.availableUnits = dataAttributes.availableUnits;
  attributes.builtUp = '';

  if (!_.isEmpty(dataAttributes.completionDate)) {
    attributes.completionDate = dataAttributes.completionDate;
  }

  if (!_.isEmpty(dataAttributes.promotion)) {
    attributes.promotion = dataAttributes.promotion;
  }

  if (!_.isEmpty(dataAttributes.architectName)) {
    attributes.architectName = dataAttributes.architectName;
  }

  if (!_.isEmpty(dataAttributes.contractorName)) {
    attributes.contractorName = dataAttributes.contractorName;
  }

  return { attributes: attributes };
};

export const getCover = (imageCover: string) => {
  console.log(imageCover);
  const response = {
    cover: {
      type: 'image',
      urlTemplate: JSON.parse(imageCover)[0]
    }
  };

  return response;
};

export const getLogo = (logo: string) => {
  const response = {
    logo: {
      type: 'image',
      url: config.image.baseUrl + '/' + JSON.parse(logo)[0]
    }
  };

  return response;
};

export const getFloorPlanImages = (floorPlansWithDescription: Array<string>) => {
  const response = {
    floorPlanImages: []
  };

  const floorPlan = {};

  _.map(floorPlansWithDescription, (item) => {
    const [description, img] = _.split(item, ';');
    floorPlan.type = 'image';
    floorPlan.urlTemplate = _.trim(img, '"');
    floorPlan.description = description;

    response.floorPlanImages.push(floorPlan);
  });

  return response;
};

export const getListingImages = (imagesWithDescription: Array<string>) => {
  const response = {
    medias: []
  };

  const image = {
    type: '',
    urlTemplate: '',
    description: ''
  };

  _.map(imagesWithDescription, (item) => {
    const [description, img] = _.split(item, ';');
    image.type = 'image';
    image.urlTemplate = _.trim(img, '"');
    image.description = description;

    response.medias.push(image);
  });

  return response;
};

export const getProjectLink = (obj: {projectName: string, city: string, id: number, lang: string}): string => {
  const {projectName, city, id, lang} = obj;

  let formatUrl = '';
  if (lang === 'id') {
    formatUrl = '/properti/' + slugify(city) + '/' + slugify(projectName) + '/' + id;
  } else {
    formatUrl = '/en/property/' + slugify(city) + '/' + slugify(projectName) + '/' + id;
  }

  return config.url.newlaunch + formatUrl;
};

export const getYoutubeIds = (youtubeLinks: Array<string>) => {
  const youtubeIds = [];

  _.map(_.compact(youtubeLinks), (item) => {
    const [description, url] = _.split(item, ';');
    youtubeIds.push(url);
  });

  return !_.isEmpty(youtubeIds) ? {youtubeIds: youtubeIds} : null;
};

export const getThreeSixtyVideos = (threeSixtyLinks: Array<string>) => {
  const video360s = [];

  _.map(_.compact(threeSixtyLinks), (item) => {
    const [description, url] = _.split(item, ';');
    video360s.push(url);
  });

  return !_.isEmpty(video360s) ? {video360s: video360s} : null;
};

export const getBannerSponsorship = ({link, title}: {|link: string, title: string|}) => {
  return !_.isNil(link) ? {banner: {link: link, title: title}} : null;
};
