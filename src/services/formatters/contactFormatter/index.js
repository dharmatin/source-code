// @flow
import _ from 'lodash';
import type {Phone, Contact} from './types';

const getPhoneInfo = (dataPhones: Object): Array<Phone> => {
  const phones = [];
  const phone = {};

  if (dataPhones.mainContact !== '') {
    phone.label = 'LandLine';
    phone.number = '+' + dataPhones.mainContact.toString();
    phones.push(phone);
  }

  if (dataPhones.secondaryContact !== '') {
    phone.label = 'LandLine';
    phone.number = '+' + dataPhones.secondaryContact.toString();
    phones.push(phone);
  }

  if (dataPhones.whatsapp !== '') {
    phone.label = 'Whatsapp';
    phone.number = dataPhones.whatsapp.toString();
    phones.push(phone);
  }

  return phones;
};

const getEmails = (mainEmail: string, additionalEmail: string): Array<string> => {
  const emails = [];
  emails.push(mainEmail);

  if (!_.isEmpty(additionalEmail)) {
    emails.push(additionalEmail);
  }

  return emails;
};

export const getContactInfo = (dataContact: Object): Contact => {
  return {
    phones: getPhoneInfo({
      mainContact: dataContact.mainContact,
      secondaryContact: dataContact.mainContact,
      whatsapp: dataContact.whatsapp
    }),
    emails: getEmails(dataContact.email, dataContact.additionalEmail)
  };
};