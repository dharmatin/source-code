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

  if (!_.isEmpty(dataAttributes.downloadUrl)) {
    attribute.downloadUrl =
      config.image.baseUrl + '/' + dataAttributes.downloadUrl;
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

  if (!_.isNil(dataAttributes.electricity)) {
    attribute.electricity = dataAttributes.electricity.toString();
  }

  let bathroom = '';
  if (
    !_.isNil(dataAttributes.bathroomMin) &&
    !_.isNil(dataAttributes.bathroomMax)
  ) {
    bathroom = formatConfigAttributeRangeValues({
      min: dataAttributes.bathroomMin,
      max: dataAttributes.bathroomMax
    });
  } else if (!_.isNil(dataAttributes.bathroom)) {
    bathroom = dataAttributes.bathroom.toLocaleString(
      config.lang
    );
  }

  if (bathroom !== '') {
    attribute.bathroom = bathroom;
  }

  let bedroom = '';
  if (
    !_.isNil(dataAttributes.bedroomMin) &&
    !_.isNil(dataAttributes.bedroomMax)
  ) {
    bedroom = formatConfigAttributeRangeValues({
      min: dataAttributes.bedroomMin,
      max: dataAttributes.bedroomMax
    });

  } else if (!_.isNil(dataAttributes.bedroom)) {
    bedroom = dataAttributes.bedroom.toLocaleString(
      config.lang
    );
  }

  if (bedroom !== '') {
    attribute.bedroom = bedroom;
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
