import _ from 'lodash';
import config from '../../config/index';
import { toISOFormatting, slugify } from './utility';

export function getGeneralInfo(dataGeneral, lang) {
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
      id: id
    }, lang)
  };

  if (!_.isEmpty(website)) {
    _.assign(response, {website: website});
  }

  return response;
}

export function getAttributesInfo(dataAttributes) {
  const response = {
    attributes: {
      totalUnits: dataAttributes.totalUnits,
      availableUnits: dataAttributes.availableUnits,
      completionDate: dataAttributes.completionDate,
      builtUp: '',
      architectName: dataAttributes.architectName,
      contractorName: dataAttributes.contractorName
    }
  };

  return response;
}

export function getCover(imageCover) {
  const response = {
    cover: {
      type: 'image',
      urlTemplate: JSON.parse(imageCover)[0]
    }
  };

  return response;
}

export function getLogo(logo) {
  const response = {
    logo: {
      type: 'image',
      url: config.image.baseUrl + '/' + JSON.parse(logo)[0]
    }
  };

  return response;
}

export function getFloorPlanImages(floorPlansWithDescription) {
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
}

export function getListingImages(imagesWithDescription) {
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
}

export function getProjectLink(param, lang) {
  const {projectName, city, id} = param;

  let formatUrl = '';
  if (lang === 'id') {
    formatUrl = '/properti/' + slugify(city) + '/' + slugify(projectName) + '/' + id;
  } else {
    formatUrl = '/en/property/' + slugify(city) + '/' + slugify(projectName) + '/' + id;
  }

  return config.url.newlaunch + formatUrl;
}
