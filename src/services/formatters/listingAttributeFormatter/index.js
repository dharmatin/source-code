// @flow
import _ from 'lodash';
import type {Attributes} from './types';
import config from '../../../config';

export const formatterAttributesInfo = (dataAttributes: Object): Attributes => {
  const attribute = {};

  if (!_.isNil(dataAttributes.totalUnits)) {
    attribute.totalUnits = dataAttributes.totalUnits.toString();
  }

  if (!_.isNil(dataAttributes.builtUpMin) && !_.isNil(dataAttributes.builtUpMax)) {  
    //dataAttributes.numberSeparator

    attribute.builtUp = dataAttributes.builtUp.toLocaleString(['ban', 'id']).toString();
  } else if (!_.isNil(dataAttributes.builtUp)) {
    console.log(dataAttributes.builtUp.toLocaleString(['ban', 'id']));
    attribute.builtUp = dataAttributes.builtUp.toLocaleString(['ban', 'id']).toString();
  }

  if (!_.isEmpty(dataAttributes.downloadURL)) {
    attribute.downloadURL =  config.image.baseUrl + '/' + dataAttributes.downloadURL;
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
    attribute.landArea = dataAttributes.landArea.toString();
  } else if (!_.isNil(dataAttributes.landArea)) {
    attribute.landArea = dataAttributes.landArea.toString();
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