// @flow
import _ from 'lodash';
import type {Attributes} from '../listingAttributeFormatter/types';
import config from '../../../config';

export const getAttributesInfo = (dataAttributes: Object): Attributes => {
  const attributes = {};

  if (!_.isNil(dataAttributes.totalUnits)) {
    attributes.totalUnits = dataAttributes.totalUnits.toString();
  }
  if (!_.isNil(dataAttributes.builtUp)) {
    attributes.builtUp = dataAttributes.builtUp.toString();
  }

  if (!_.isNil(dataAttributes.builtUp)) {
    attributes.builtUp = dataAttributes.builtUp.toString();
  }

  if (!_.isEmpty(dataAttributes.downloadURL)) {
    attributes.downloadURL =  config.image.baseUrl + '/' + dataAttributes.downloadURL;
  }

  if (!_.isNil(dataAttributes.carPark)) {
    attributes.carPark = dataAttributes.carPark.toString();
  }

  if (!_.isNil(dataAttributes.phoneLine) && !_.isEmpty(dataAttributes.phoneLine)) {
    attributes.phoneLine = dataAttributes.phoneLine.toString();
  }

  if (!_.isNil(dataAttributes.internet)) {
    attributes.internet = dataAttributes.internet.toString();
  }

  if (!_.isNil(dataAttributes.bathRoom)) {
    attributes.bathRoom = dataAttributes.bathRoom.toString();
  }

  if (!_.isNil(dataAttributes.bedRoom)) {
    attributes.bedRoom = dataAttributes.bedRoom.toString();
  }

  if (!_.isNil(dataAttributes.landArea)) {
    attributes.landArea = dataAttributes.landArea.toString();
  }

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

  return attributes;
};