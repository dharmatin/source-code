// @flow
import _ from 'lodash';
import type {Attributes} from './types';
import config from '../../../config';
import {formatterToLocalizeNumber} from '../../../libs/utility';

export const formatterAttributesInfo = (dataAttributes: Object): Attributes => {
  const attribute = {};

  if (!_.isNil(dataAttributes.totalUnits)) {
    attribute.totalUnits = dataAttributes.totalUnits.toString();
  }

  if (!_.isNil(dataAttributes.builtUpMin) && !_.isNil(dataAttributes.builtUpMax)) {
    if (dataAttributes.builtUpMin > 0 && dataAttributes.builtUpMax > 0) {
      let builtUpRange = formatterToLocalizeNumber(dataAttributes.builtUpMin, dataAttributes.lang) + ' - ' +
          formatterToLocalizeNumber(dataAttributes.builtUpMax, dataAttributes.lang);

      if (dataAttributes.lang === 'en') {
        attribute.builtUp = 'From ' + builtUpRange;
      } else {
        attribute.builtUp = 'Dari ' + builtUpRange;
      }
    }
  } else if (!_.isNil(dataAttributes.builtUp)) {
    attribute.builtUp = formatterToLocalizeNumber(dataAttributes.builtUp, dataAttributes.lang).toString();
  }

  if (!_.isEmpty(dataAttributes.downloadURL)) {
    attribute.downloadURL = config.image.baseUrl + '/' + dataAttributes.downloadURL;
  }

  if (!_.isNil(dataAttributes.carPark)) {
    attribute.carPark = dataAttributes.carPark.toString();
  }

  if (!_.isNil(dataAttributes.phoneLine) && !_.isEmpty(dataAttributes.phoneLine)) {
    attribute.phoneLine = dataAttributes.phoneLine.toString();
  }

  if (!_.isNil(dataAttributes.internet)) {
    attribute.internet = dataAttributes.internet.toString();
  }

  if (!_.isNil(dataAttributes.bathRoom)) {
    attribute.bathRoom = dataAttributes.bathRoom.toString();
  }

  if (!_.isNil(dataAttributes.bedRoom)) {
    attribute.bedRoom = dataAttributes.bedRoom.toString();
  }

  if (!_.isNil(dataAttributes.landAreaMin) && !_.isNil(dataAttributes.landAreaMax)) {
    if (dataAttributes.landAreaMin > 0 && dataAttributes.landAreaMax > 0) {
      let landAreaRange = formatterToLocalizeNumber(dataAttributes.landAreaMin, dataAttributes.lang) + ' - ' +
            formatterToLocalizeNumber(dataAttributes.landAreaMax, dataAttributes.lang);

      if (dataAttributes.lang === 'en') {
        attribute.landArea = 'From ' + landAreaRange;
      } else {
        attribute.landArea = 'Dari ' + landAreaRange;
      }
    }
  } else if (!_.isNil(dataAttributes.landArea)) {
    attribute.landArea = formatterToLocalizeNumber(dataAttributes.landArea, dataAttributes.lang).toString();
  }

  if (!_.isEmpty(dataAttributes.completionDate)) {
    attribute.completionDate = dataAttributes.completionDate;
  }

  if (!_.isEmpty(dataAttributes.promotion)) {
    attribute.promotion = dataAttributes.promotion;
  }

  if (!_.isEmpty(dataAttributes.architectName)) {
    attribute.architectName = dataAttributes.architectName;
  }

  if (!_.isEmpty(dataAttributes.contractorName)) {
    attribute.contractorName = dataAttributes.contractorName;
  }

  return attribute;
};
