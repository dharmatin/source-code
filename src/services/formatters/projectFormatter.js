import _ from 'lodash';
import config from '../../config/index';
import { toISOFormatting, slugify } from '../../libs/utility';

export const getGeneralInfo = (dataGeneral, lang) => {
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
      lang: lang
    })
  };

  if (!_.isEmpty(website)) {
    _.assign(response, {website: website});
  }

  return response;
};

export const getAttributesInfo = dataAttributes => {
  const attributes = {
    totalUnits: dataAttributes.totalUnits,
    availableUnits: dataAttributes.availableUnits,
    builtUp: '',
  };

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

export const getCover = imageCover => {
  const response = {
    cover: {
      type: 'image',
      urlTemplate: JSON.parse(imageCover)[0]
    }
  };

  return response;
};

export const getLogo = logo => {
  const response = {
    logo: {
      type: 'image',
      url: config.image.baseUrl + '/' + JSON.parse(logo)[0]
    }
  };

  return response;
};

export const getFloorPlanImages = floorPlansWithDescription => {
  const response = {
    floorPlanImages: []
  };

  const floorPlan = {
    type: '',
    urlTemplate: ''
  };

  _.map(floorPlansWithDescription, (item) => {
    const [description, img] = _.split(item, ';');
    floorPlan.type = 'image';
    floorPlan.urlTemplate = _.trim(img, '"');
    floorPlan.description = description;

    response.floorPlanImages.push(floorPlan);
  });

  return response;
};

export const getListingImages = imagesWithDescription => {
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

export const getProjectLink = param => {
  const {projectName, city, id, lang} = param;

  let formatUrl = '';
  if (lang === 'id') {
    formatUrl = '/properti/' + slugify(city) + '/' + slugify(projectName) + '/' + id;
  } else {
    formatUrl = '/en/property/' + slugify(city) + '/' + slugify(projectName) + '/' + id;
  }

  return config.url.newlaunch + formatUrl;
};

export const getYoutubeIds = youtubeLinks => {
  const youtubeIds = [];

  _.map(_.compact(youtubeLinks), (item) => {
    const [description, url] = _.split(item, ';');
    youtubeIds.push(url);
  });

  return !_.isEmpty(youtubeIds) ? {youtubeIds: youtubeIds} : null;
};

export const getThreeSixtyVideos = threeSixtyLinks => {
  const video360s = [];

  _.map(_.compact(threeSixtyLinks), (item) => {
    const [description, url] = _.split(item, ';');
    video360s.push(url);
  });

  return !_.isEmpty(video360s) ? {video360s: video360s} : null;
};

export const getBannerSponsorship = param => {
  return !_.isNil(param.link) ? {banner: param} : null;
};
