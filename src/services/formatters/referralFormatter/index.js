
import _ from 'lodash';
import type { Referral } from './types';
import config from '../../../config';
import { formatProjectProfilePageLink } from '../listingFormatter';

export const formatStatusReferral = (
  dataReferral: Object,
  dataListing: Object
): Referral => {
  
  const response = {
    status: config.REFERRAL.INACTIVE
  };

  if (!_.isEmpty(dataListing) > 0 && !_.isEmpty(dataListing.attachments)) {
    const attachments = JSON.parse(JSON.stringify(JSON.parse(dataListing.attachments)));
    if (!_.isEmpty(attachments.toc)) {
      response.referralToc = config.image.baseUrl + '/' + attachments.toc;
    }
  }

  if (!_.isEmpty(dataReferral)) {
    if (!_.isEmpty(dataReferral.referralCode) && dataReferral.referralStatus === config.STATUS_REFERRAL.APPROVED) {
      response.referralToken = dataReferral.referralCode;
      response.shareLink = formatProjectProfilePageLink({projectName: dataListing.project_name, 'city': dataListing.city_name, 'id': dataListing.id});
    }
    response.status = labelStatusReferral(dataReferral.referralStatus);
  }

  return response;
};

const labelStatusReferral = (status: number): string => {
  let result = config.REFERRAL.INACTIVE;
  if (status === -1) {
    result = config.REFERRAL.PENDING;
  }  
  if (status === 0) {
    result = config.REFERRAL.REJECT;
  }
  if (status === 1) {
    result = config.REFERRAL.APPROVED;
  }

  return result;
}

export const formatUrlReferral = (code: string): string => {
  return 'http://www.rumah123.com';
}
