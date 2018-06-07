import _ from 'lodash';
import type { Attribute } from './type';

const formatAttribute = (listingDoc: Object): Attribute => {
  let attributes: Attribute = {};

  if (!_.isNil(listingDoc.garage)) attributes.carPark = (listingDoc.garage).toString();
  if (!_.isNil(listingDoc.land_size)) attributes.landArea = (listingDoc.land_size).toString();
  if (!_.isNil(listingDoc.building_size)) attributes.builtUp = (listingDoc.building_size).toString();
  if (!_.isEmpty(listingDoc.condition)) attributes.condition = listingDoc.condition;
  if (!_.isEmpty(formatCertificate(listingDoc.certificate))) attributes.certificate = formatCertificate(listingDoc.certificate);
  if (!_.isEmpty(listingDoc.propertycondition)) attributes.propertyCondition = listingDoc.propertycondition;
  if (!_.isEmpty(listingDoc.floor)) attributes.floors = listingDoc.floor;
  if (!_.isEmpty(listingDoc.servbedroom)) attributes.maidRooms = listingDoc.servbedroom;
  if (!_.isEmpty(listingDoc.servbathroom)) attributes.maidBathroom = listingDoc.servbathroom;
  if (!_.isEmpty(listingDoc.bathroom) || !_.isNil(listingDoc.bathroom)) attributes.bathroom = (listingDoc.bathroom).toString();
  if (!_.isEmpty(listingDoc.bedroom) || !_.isNil(listingDoc.bedroom)) attributes.bedroom = (listingDoc.bedroom).toString();
  if (!_.isEmpty(listingDoc.views)) attributes.views = listingDoc.views;
  if (!_.isEmpty(listingDoc.electricity)) attributes.electricity = listingDoc.electricity;
  if (!_.isEmpty(listingDoc.phoneLine)) attributes.landArea = listingDoc.phoneLine;

  return attributes;
};

const formatCertificate = (certificate: Array): string => {
  const certificates = certificate;
  return certificates.join(', ');
};

export default formatAttribute;
