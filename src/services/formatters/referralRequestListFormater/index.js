// @flow
import _ from 'lodash';
import moment from 'moment';
import type { ReferralListers } from './types';
import config from '../../../config';
import { isValidDate, toISOFormatting } from '../../../libs/utility';
import { formatlisterPageLink } from '../listerFormatter';

export const formatAttributesReferral = (
  referralListers: Array<Object>,
  totalreferralList: any,
  pagingRequest: Object,
): Array<ReferralListers> => {
  const result = {};
  if (referralListers.length > 0) {
    const referralListersArray = [];

    _.map(referralListers, item => {
      const referralListerObject = {};
      referralListerObject.listers =
      {
        id: item.user_id,
        name: item.first_name + ' ' + item.last_name,
        image:
        {
          url: config.image.baseUrl + '/' + item.profile_photo
        },
        website: formatlisterPageLink({
          organisationName: item.company_name,
          listerName: item.first_name + ' ' + item.last_name,
          id: item.user_id,
        })
      };
      referralListerObject.listings =
    {
      id: item.ads_project_id,
      title: item.ads_name
    };

      if (isValidDate(item.created_date)) {
        referralListerObject.createdAt = moment(item.created_date).format('YYYY-MM-DDThh:mm:ssTZ');
      }

      if (isValidDate(item.approved_date)) {
        referralListerObject.updatedAt = moment(item.approved_date).format('YYYY-MM-DDThh:mm:ssTZ');
      }

      if (isValidDate(item.removed_date)) {
        referralListerObject.removedAt = moment(item.removed_date).format('YYYY-MM-DDThh:mm:ssTZ');
      }

      if (item.referral_reason) {
        referralListerObject.message = item.referral_reason;
      }

      referralListerObject.status = setReferralStatus(item.referral_status);

      referralListersArray.push(referralListerObject);
    });

    result.totalCount = 0;
    if (referralListersArray.length > 0) {
      result.listers = referralListersArray;
      if (
        (pagingRequest.pageToken * pagingRequest.pageSize) < totalreferralList &&
      totalreferralList > 1
      ) {
        result.nextPageToken = (Number(pagingRequest.pageToken) + 1).toString();
      }
      result.totalCount = totalreferralList;
    }
    return [result];
  }

  result.totalCount = totalreferralList;

  return [result];
};

export const setReferralStatus = (refStatus: any): any => {
  if (refStatus === config.STATUS_REFERRAL.APPROVED) {
    return config.STATUS_REFERRAL_TXT.APPROVED;
  }
  if (refStatus === config.STATUS_REFERRAL.PENDING) {
    return config.STATUS_REFERRAL_TXT.PENDING;
  }
  if (refStatus === config.STATUS_REFERRAL.REJECT) {
    return config.STATUS_REFERRAL_TXT.INACTIVE;
  }
};
