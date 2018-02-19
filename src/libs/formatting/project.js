import config from '../../config/index';
import { toISOFormatting } from './utility';

export function getGeneral(dataGeneral) {
  return {
    id: dataGeneral.id,
    title: dataGeneral.tagline,
    projectName: dataGeneral.projectName,
    description: dataGeneral.description,
    propertyType: dataGeneral.companyId === '0' ? 'Project' : dataGeneral.propertyType,
    updatedAt: toISOFormatting(dataGeneral.updatedAt)
  };
}

export function getAttributes(dataAttributes) {
  const response = {
    attributes: {
      totalUnits: dataAttributes.totalUnits,
      availableUnits: dataAttributes.availableUnits,
      completionDate: dataAttributes.completionDate,
      builtUp: ''
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
