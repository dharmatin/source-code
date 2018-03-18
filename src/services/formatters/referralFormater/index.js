// @flow
import _ from 'lodash';
import type { Referral } from './types';
import config from '../../../config';

export const formatAttributesReferral = (
  referral: Array<Object>,
  req: Object
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
      createdAt: item.created_date,
      updatedAt: item.approved_date,
      message: item.referral_reason,
      status: (item.referall_status === 1 ? 'Approve' : 'Pending')
    };
  });

  const totalNumber = Listers.length;
  const nextPageToken = ((req.query.pageToken * req.query.pageSize >= totalNumber) ? req.query.pageToken : req.query.pageToken + 1).toString();

  const result = {};
  if (Listers.length > 0) {
    result.Listers = Listers;
    result.totalCount = totalNumber;
    if (nextPageToken > req.query.pageToken) {
      result.nextPageToken = nextPageToken;
    }
    result.totalCount = totalNumber;
  } else {
    result.totalCount = 0;
  }

  return [result];
};
