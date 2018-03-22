// @flow
import EmailQueueDataCollector from '../EmailQueueDataCollector';
import type { ReferralCollectorData, EmailQueueData, DataCollector } from '../../data/types';
import config from '../../../../config';

const EMAIL_TEMPLATE = '/referral/agent_request.php';

class ReferralRequestAgent extends EmailQueueDataCollector implements DataCollector {
  constructor() {
    super();
    this.setDefaultEmailQueueData();
  }

  async collect(params: ReferralCollectorData): Promise<EmailQueueData> {
    this.setDefaultEmailQueueData();
    const data = await this.queuedDataForLister({
      listingId: params.listingId,
      listerId: params.listerId,
      referralCode: params.referralCode
    });
    data.subject = config.translator.email_subject.referral_request_sended;
    data.template = EMAIL_TEMPLATE;
    this.setEmailQueueData(data);

    return this.getEmailQueueData();
  }
}

export default new ReferralRequestAgent();
