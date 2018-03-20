// @flow
import _ from 'lodash';
import Sequelize from 'sequelize';
import referralDao from '../dao/referrals';
import listingDao from '../dao/listings';
import listerDao from '../dao/listers';
import config from '../config';
import EmailQueueService from './emailQueueService';
import type { EmailQueueData } from './data/emailQueue/type';

export class ReferralEmailQueueDataCollectorService {
  listing: Object;
  lister: Object;
  emailQueueData: EmailQueueData;

  constructor(listingDao: Object, listerDao: Object) {
    this.listing = listingDao;
    this.lister = listerDao;
    this.emailQueueData = {
      from: 'Rumah123.com',
      to: '',
      jsonData: {},
      subject: '',
      template: ''
    };
  }

  async referralApprove(listingId: string, listerId: number): Promise<EmailQueueData> {
    this.emailQueueData.from = '';
    this.emailQueueData.to = '';
    this.emailQueueData.jsonData = {};
    this.emailQueueData.subject = '';
    this.emailQueueData.template = 'referral/granted';

    return this.emailQueueData;
  }

  async searchProjectById(id: string): Promise<Object> {
    const result = await this.listing.searchProject(id);
    return result;
  }

  async searchListerById(id: number): Promise<Object> {
    const result = await this.listerDao.searchLister(id);
    return result;
  }
}

export default new ReferralEmailQueueDataCollectorService(listingDao, listerDao);
