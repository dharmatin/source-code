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
      lister: {
        agentName: item.first_name + ' ' + item.last_name,
        agentPhoto: config.image.sharpieUrl + '/' + item.profile_photo
      },
      listing: {
        adsProjectId: item.ads_project_id,
        adsTitle: item.ads_name
      },
      createdAt: toISOFormatting(item.created_date),
      updatedAt: toISOFormatting(item.approved_date),
      removedAt: toISOFormatting(item.removed_date),
      message: item.referral_reason,
      status: item.referral_status
    };
  });

  const nextPageToken = ((Number(req.query.pageToken) * Number(req.query.pageSize) >= totalReferral) ? Number(req.query.pageToken) : Number(req.query.pageToken) + 1).toString();

  const result = {};
  if (Listers.length > 0) {
    result.Listers = Listers;
    if (nextPageToken > req.query.pageToken) {
      result.nextPageToken = nextPageToken;
    }
    result.totalCount = totalReferral;
  } else {
    result.totalCount = 0;
  }

  return [result];
};

export const setReferralStatus = (refStatus: any): any => {
  if (refStatus === 1) {
    return 'Approved';
  }
  if (refStatus === -1) {
    return 'Pending';
  }
  if (refStatus === 0) {
    return 'Removed';
  }
};
