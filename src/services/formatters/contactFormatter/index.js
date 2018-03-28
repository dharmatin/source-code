// @flow
import _ from 'lodash';
import type { Phone, Contact } from './types';

const formatPhoneInfo = (dataPhones: Object): Array<Phone> => {
  const phones = [];

  if (dataPhones.mainContact !== '') {
    phones.push({
      label: 'LandLine',
      number: '+' + dataPhones.mainContact.toString(),
    });
  }

  if (dataPhones.secondaryContact !== '') {
    phones.push({
      label: 'LandLine',
      number: '+' + dataPhones.secondaryContact.toString(),
    });
  }

  if (dataPhones.whatsapp !== '') {
    phones.push({
      label: 'Whatsapp',
      number: dataPhones.whatsapp.toString(),
    });
  }

  return phones;
};

const formatEmailInfo = (
  mainEmail: string,
  additionalEmail: string
): Array<string> => {
  const emails = [];
  emails.push(mainEmail);

  if (!_.isEmpty(additionalEmail)) {
    emails.push(additionalEmail);
  }

  return emails;
};

export const formatContactInfo = (dataContact: Object): Contact => {
  return {
    phones: formatPhoneInfo({
      mainContact: dataContact.mainContact,
      secondaryContact: dataContact.secondaryContact,
      whatsapp: dataContact.whatsapp,
    }),
    emails: formatEmailInfo(dataContact.email, dataContact.additionalEmail),
  };
};
