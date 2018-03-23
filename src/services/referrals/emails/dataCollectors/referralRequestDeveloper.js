// @flow
import _ from 'lodash';
import EmailQueueDataCollector from '../EmailQueueDataCollector';
import type { ReferralCollectorData, EmailQueueData, DataCollector } from '../../data/types';
import config from '../../../../config';
import { formatDeveloperDashboard } from '../../../formatters/emailQueueDataCollectorFormatter';
import referralDao from '../../../../dao/referrals';

const EMAIL_TEMPLATE = 'Referalls\\DeveloperRequester';

class ReferralRequestDeveloper extends EmailQueueDataCollector implements DataCollector {
  referrals: Object;
  constructor(referralDao: Object) {
    super();
    this.referrals = referralDao;
    this.setDefaultEmailQueueData();
  }

  async collect(params: ReferralCollectorData): Promise<EmailQueueData> {
    this.setDefaultEmailQueueData();
    const data = await this.queuedDataForOrganisation({
      listingId: params.listingId,
      listerId: params.listerId,
      referralCode: params.referralCode
    });
    const sumReferralPendingRequest = await this.countReferralPendingRequest(data.jsonData.developerDashboard);
    data.jsonData.developerDashboard = formatDeveloperDashboard({
      totalPending: sumReferralPendingRequest,
      dataApproval: {
        listingId: params.listingId,
        listerId: params.listerId
      }
    });
    data.subject = config.translator.email_subject.referral_have_request;
    data.template = EMAIL_TEMPLATE;
    this.setEmailQueueData(data);

    return this.getEmailQueueData();
  }

  async countReferralPendingRequest(projectByOrganisation: Object): Promise<number> {
    const adsOtherProject: Array<number> = _.map(projectByOrganisation.items, (data: Object): number => {
      return data.id;
    });
    const count = await this.referrals.getOtherReferralPending(adsOtherProject);
    return count;
  }
}

export default new ReferralRequestDeveloper(referralDao);
