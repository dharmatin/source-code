// @flow
import _ from 'lodash';
import type { Referral } from './types';
import config from '../../../config';
import { toISOFormatting } from '../../../libs/utility';

export const formatAttributesReferral = (
  referral: Array<Object>,
  req: Object,
  totalReferral: any
): Array<Referral> => {
  const Listers = _.map(referral, (item): Object => {
    return {
      listers: {
        id: item.user_id,
        name: item.first_name + ' ' + item.last_name,
        image: {
          url: config.image.sharpieUrl + '/' + item.profile_photo
        },
        website: item.personalweb_url
      },
      listings: {
        id: item.ads_project_id,
        title: item.ads_name
      },
      createdAt: item.created_date,
      updatedAt: item.approved_date,
      removedAt: item.removed_date,
      message: item.referral_reason,
      status: item.referral_status
    };
  });

  const nextPageToken = ((Number(req.query.pageToken) * Number(req.query.pageSize) >= totalReferral) ? Number(req.query.pageToken) : Number(req.query.pageToken) + 1).toString();

  const result = {};
  result.totalCount = 0;
  if (Listers.length > 0) {
    result.Listers = Listers;
    if (nextPageToken > req.query.pageToken) {
      result.nextPageToken = nextPageToken;
    }
    result.totalCount = totalReferral;
  }

  return [result];
};

export const setReferralStatus = (refStatus: any): any => {
  if (refStatus === 1) {
    return config.STATUS_REFERRAL_TXT.APPROVED;
  }
  if (refStatus === -1) {
    return config.STATUS_REFERRAL_TXT.PENDING;
  }
  if (refStatus === 0) {
    return config.STATUS_REFERRAL_TXT.INACTIVE;
  }
};
