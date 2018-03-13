// @flow
import _ from 'lodash';
import type { Attributes } from './types';
import config from '../../../config';

const formatConfigAttributeRangeValues = (dataAttributes: Object): string => {
  let response = '';
  
  if (dataAttributes.min > 0 && dataAttributes.max > 0) {
    if (dataAttributes.min === dataAttributes.max) {
      response = dataAttributes.min.toLocaleString(
        config.lang
      );
    } else {
      response =
        dataAttributes.min.toLocaleString(config.lang) +
        ' - ' +
        dataAttributes.max.toLocaleString(config.lang);
    }
  }

  return response;
};

export const formatAttributesInfo = (dataAttributes: Object): Attributes => {
  const attribute = {};
  if (!_.isNil(dataAttributes.totalUnits)) {
    attribute.totalUnits = dataAttributes.totalUnits.toString();
  }

  if (
    !_.isNil(dataAttributes.builtUpMin) &&
    !_.isNil(dataAttributes.builtUpMax)
  ) {
    if (dataAttributes.builtUpMin > 0 && dataAttributes.builtUpMax > 0) {
      let builtUpRange =
        dataAttributes.builtUpMin.toLocaleString(config.lang) +
        ' - ' +
        dataAttributes.builtUpMax.toLocaleString(config.lang);

      attribute.builtUp = config.translator.from + ' ' + builtUpRange;
    }
  } else if (!_.isNil(dataAttributes.builtUp)) {
    attribute.builtUp = dataAttributes.builtUp.toLocaleString(
      config.lang
    );
  }

  if (!_.isEmpty(dataAttributes.downloadURL)) {
    attribute.downloadURL =
      config.image.baseUrl + '/' + dataAttributes.downloadURL;
  }

  let carPark = '';
  if (
    !_.isNil(dataAttributes.carParkMin) &&
    !_.isNil(dataAttributes.carParkMax)
  ) {
    carPark = formatConfigAttributeRangeValues({
      min: dataAttributes.carParkMin,
      max: dataAttributes.carParkMax
    });
  } else if (!_.isNil(dataAttributes.carPark)) {
    carPark = dataAttributes.carPark.toLocaleString(
      config.lang
    );
  }

  if (carPark !== '') {
    attribute.carPark = carPark;
  }

  if (
    !_.isNil(dataAttributes.phoneLine) &&
    !_.isEmpty(dataAttributes.phoneLine)
  ) {
    attribute.phoneLine = dataAttributes.phoneLine.toString();
  }

  if (!_.isNil(dataAttributes.internet)) {
    attribute.internet = dataAttributes.internet.toString();
  }

  let bathRoom = '';
  if (
    !_.isNil(dataAttributes.bathRoomMin) &&
    !_.isNil(dataAttributes.bathRoomMax)
  ) {
    bathRoom = formatConfigAttributeRangeValues({
      min: dataAttributes.bathRoomMin,
      max: dataAttributes.bathRoomMax
    });
  } else if (!_.isNil(dataAttributes.bathRoom)) {
    bathRoom = dataAttributes.bathRoom.toLocaleString(
      config.lang
    );
  }

  if (bathRoom !== '') {
    attribute.bathRoom = bathRoom;
  }

  let bedRoom = '';
  if (
    !_.isNil(dataAttributes.bedRoomMin) &&
    !_.isNil(dataAttributes.bedRoomMax)
  ) {
    bedRoom = formatConfigAttributeRangeValues({
      min: dataAttributes.bedRoomMin,
      max: dataAttributes.bedRoomMax
    });

  } else if (!_.isNil(dataAttributes.bedRoom)) {
    bedRoom = dataAttributes.bedRoom.toLocaleString(
      config.lang
    );
  }

  if (bedRoom !== '') {
    attribute.bedRoom = bedRoom;
  }

  if (
    !_.isNil(dataAttributes.landAreaMin) &&
    !_.isNil(dataAttributes.landAreaMax)
  ) {
    if (dataAttributes.landAreaMin > 0 && dataAttributes.landAreaMax > 0) {
      let landAreaRange =
        dataAttributes.landAreaMin.toLocaleString(config.lang) +
        ' - ' +
        dataAttributes.landAreaMax.toLocaleString(config.lang);

      attribute.landArea = config.translator.from + ' ' + landAreaRange;
    }
  } else if (!_.isNil(dataAttributes.landArea)) {
    attribute.landArea = dataAttributes.landArea.toLocaleString(
      config.lang
    );
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
