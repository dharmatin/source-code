// @flow
import _ from 'lodash';
import type { ReferralStatus } from './types';
import config from '../../../config';
import { formatProjectProfilePageLink } from '../listingFormatter';

export const formatStatusReferral = (
  dataReferral: Object,
  dataListing: Object
): Referral => {
  const response = {};
  if (!_.isEmpty(dataListing)) {
    response.status = config.STATUS_REFERRAL_TXT.INACTIVE;
    
    const attachments = JSON.parse(dataListing.attachments);
    response.termsAndCondition = config.image.baseUrl + '/' + attachments.toc;

    if (
      !_.isNil(dataReferral.referralCode) &&
      dataReferral.referralStatus === config.STATUS_REFERRAL.APPROVED
    ) {
      response.referralToken = dataReferral.referralCode;
      response.shareLink = formatProjectProfilePageLink({
        projectName: dataListing.project_name,
        city: dataListing.city_name,
        id: dataListing.id,
      });
    }
    response.status = getLabelStatusReferral(dataReferral.referralStatus);
  }
  return response;
};

const getLabelStatusReferral = (status: number): string => {
  let result = config.STATUS_REFERRAL_TXT.INACTIVE;
  if (status === config.STATUS_REFERRAL.PENDING) {
    result = config.STATUS_REFERRAL_TXT.PENDING;
  }
  if (status === config.STATUS_REFERRAL.REJECT) {
    result = config.STATUS_REFERRAL_TXT.REJECTED;
  }
  if (status === config.STATUS_REFERRAL.APPROVED) {
    result = config.STATUS_REFERRAL_TXT.APPROVED;
  }

  return result;
};
