// @flow
import _ from 'lodash';
import moment from 'moment';
import type { ReferralListers } from './types';
import config from '../../../config';
import { isValidDate } from '../../../libs/utility';
import { formatListerProfile } from '../listerFormatter';

export const formatAttributesReferral = (
  referralListers: Array<Object>,
  totalreferralList: any,
  pagingRequest: Object
): Array<ReferralListers> => {
  const result = {};
  result.totalCount = 0;

  if (!_.isEmpty(referralListers)) {
    const referralApplyListers = [];

    _.map(referralListers, item => {
      const referralLister = {};
      const formatLister = {
        docs: [
          {
            id: item.user_id.toString(),
            name: item.first_name + ' ' + item.last_name,
            photo_url:
              config.image.baseUrl +
              '/photo/' +
              item.user_id +
              '/180/' +
              (item.profile_photo ? item.profile_photo : '_photo.jpg'),
            company2: item.company_name,
            register: item.first_activated_date,
            handphone: item.contact_no,
            email: item.email,
          },
        ],
      };

      referralLister.lister = formatListerProfile(formatLister);
      referralLister.listing = {
        id: item.ads_project_id.toString(),
        title: item.ads_name,
      };

      if (isValidDate(item.created_date)) {
        referralLister.createdAt = moment(item.created_date).format(
          'YYYY-MM-DDThh:mm:ssZ'
        );
      }

      if (isValidDate(item.approved_date)) {
        referralLister.updatedAt = moment(item.approved_date).format(
          'YYYY-MM-DDThh:mm:ssZ'
        );
      }

      if (isValidDate(item.removed_date)) {
        referralLister.removedAt = moment(item.removed_date).format(
          'YYYY-MM-DDThh:mm:ssZ'
        );
      }

      if (item.message_request) {
        referralLister.message = item.message_request;
      }

      referralLister.status = setReferralStatus(item.referral_status);

      referralApplyListers.push(referralLister);
    });

    if (referralApplyListers.length > 0) {
      result.listers = referralApplyListers;
      if (
        pagingRequest.pageToken * pagingRequest.pageSize <
        totalreferralList
      ) {
        result.nextPageToken = (pagingRequest.pageToken + 1).toString();
      } else {
        result.nextPageToken = pagingRequest.pageToken.toString();
      }
      result.totalCount = totalreferralList;
    }
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
