// @flow
import _ from 'lodash';
import type { ReferralListers } from './types';
import config from '../../../config';
import { getValidateDate } from '../../../libs/utility';

export const formatAttributesReferral = (
  referralListers: Array<Object>,
  req: Object,
  totalreferralList: any
): Array<ReferralListers> => {
  const referralListersArray = [];

  _.map(referralListers, item => {
    const referralListerObject = {};
    referralListerObject.listers =
      {
        id: item.user_id,
        name: item.first_name + ' ' + item.last_name,
        image:
        {
          url: config.image.sharpieUrl + '/' + item.profile_photo
        },
        website: item.personalweb_url
      };
    referralListerObject.listings =
    {
      id: item.ads_project_id,
      title: item.ads_name
    };

    if (getValidateDate(item.created_date)) {
      referralListerObject.createdAt = item.created_date;
    }

    if (getValidateDate(item.approved_date)) {
      referralListerObject.updatedAt = item.approved_date;
    }

    if (getValidateDate(item.removed_date)) {
      referralListerObject.removedAt = item.removed_date;
    }

    referralListerObject.message = item.referral_reason;
    referralListerObject.status = setReferralStatus(item.referral_status);

    referralListersArray.push(referralListerObject);
  });

  const nextPageToken = ((Number(req.query.pageToken) * Number(req.query.pageSize) >= totalreferralList) ? Number(req.query.pageToken) : Number(req.query.pageToken) + 1).toString();

  const result = {};
  result.totalCount = 0;
  if (referralListersArray.length > 0) {
    result.Listers = referralListersArray;
    if (nextPageToken > req.query.pageToken) {
      result.nextPageToken = nextPageToken;
    }
    result.totalCount = totalreferralList;
  }

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
