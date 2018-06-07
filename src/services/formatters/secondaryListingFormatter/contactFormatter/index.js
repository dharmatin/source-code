import _ from 'lodash';
import { ContactRequest, Contact, Phone } from './type';

const formatContact = (request: ContactRequest): Contact => {
  let contact: Contact = {};
  if (!_.isEmpty(request.phone) || !_.isEmpty(request.handPhone)) contact.phones = getPhones(request.phone, request.handPhone);
  if (!_.isEmpty(request.email)) contact.emails = [request.email];
  if (!_.isEmpty(request.whatsApp)) contact.whatsApp = [request.whatsApp];
  if (!_.isEmpty(request.bbPin)) contact.bbms = [request.bbPin];

  return contact;
};

const getPhones = (phone: string, handPhone: string): Array <Phone> => {
  const phones = getContactPhones(_.split(phone, ', '), 'phone');
  const handPhones = getContactPhones(_.split(handPhone, ', '), 'handphone');
  return _.compact(_.concat(phones, handPhones));
};

const getContactPhones = (numbers: Array<string>, label: string): Array<any> => {
  return _.map(numbers, (number: string): Phone => {
    if (!_.isEmpty(number)) {
      return {
        label: label,
        number: '+' + (number.replace('+', ''))
      };
    }
  });
};

export default formatContact;
