// @flow
import config from '../../../config';
import _ from 'lodash';
import { toISOFormatting, slugify } from '../../../libs/utility';
import type {GeneralInfo, ProjectLink} from './types';

export const getGeneralInfo = (dataGeneral: GeneralInfo): GeneralInfo => {
  const {id, title, subtitle, description, city, featureDescription, website, updatedAt} = dataGeneral;
  const response = {};

  response.channels = ['new'];
  response.description = description;
  response.id = id;
  response.subtitle = subtitle;
  response.title = title;
  response.propertyType = dataGeneral.companyId === '0' ? 'Project' : dataGeneral.propertyType;
  response.updatedAt = toISOFormatting(updatedAt);

  if (!_.isEmpty(featureDescription)) {
    let responseFeatureDescription = '';
    _.map(featureDescription, (values) => {
      let dataFeatureDescription = _.split(values, ':');
      responseFeatureDescription += '<b>' + dataFeatureDescription[0] + '</b>' +
				'<p>' + dataFeatureDescription[0] + '</p>' + '<br/><br/> ';
    });

    responseFeatureDescription = _.trimEnd(responseFeatureDescription, '<br/><br/>');
    _.assign(response, {featureDescription: responseFeatureDescription});
  }

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

export const getImageCover = (imageCover: string): Object => {
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

export const getProjectLink = (obj: ProjectLink, lang: string): string => {
  const {projectName, city, id} = obj;

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

export const getBannerSponsorship = ({link, title}: {|link?: string, title: string|}): ?Object => {
  return !_.isNil(link) ? {banner: {link: link, title: title}} : null;
};

export const getFeatures = (facilities: Array<string>): Object => {
  const responseFeatures = [];
  const responseMedia = {};

  _.map(facilities, (facility) => {
    let dataFacility = _.split(facility, ':');

    responseMedia.description = dataFacility[0];
    responseMedia.media = {
      type: 'image',
      urlTemplate: config.image.sharpieUrl + '/premium/${width}x${height}-${scale}/' + JSON.parse(dataFacility[1])[0]
    };
    responseFeatures.push(responseMedia);
  });

  return {features: responseFeatures};
};

export const getTierOfProject = (isPremium: number, isGTS: number): number => {
  if (isPremium === 0) {
    return config.tier.standard;
  } else {
    if (isGTS === 1) {
      return config.tier.featured;
    } else {
      return config.tier.premium;
    }
  }
}
;
