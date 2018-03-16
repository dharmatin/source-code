// @flow
import _ from 'lodash';
import listingDao from '../dao/listings';
import listerDao from '../dao/listers';
import type { EmailQueueData } from './data/emailQueue/type';
import { formatProject, formatLister, formatOrganisation } from './formatters/referralEmailQueueDataCollectorFormatter';
import config from '../config';

export class ReferralEmailQueueDataCollectorService {
  listing: Object;
  lister: Object;
  emailQueueData: EmailQueueData;

  constructor(listingDao: Object, listerDao: Object) {
    this.listing = listingDao;
    this.lister = listerDao;
  }

  async referralApprove(listingId: string, listerId: number): Promise<EmailQueueData> {
    this.setDefaultEmailQueueData();
    const listing = await this.searchProjectById(listingId);
    const listers = await this.searchListerById(listerId);
    let requestedProject = {};
    let similar = [];
    let organisationInfo = {};
    let listerInfo = {};

    if (listing.response.numFound) {
      const listingDoc = listing.response.docs[0];
      const listerDoc = listers.response.docs[0];
      const similarListings = await this.searchSimilarProject(listingDoc.developer_company_id, listingId);
      const similarListingDocs = similarListings.response.docs;

      requestedProject = formatProject(listingDoc);
      listerInfo = formatLister(listerDoc);
      organisationInfo = formatOrganisation(listingDoc);

      _.map(similarListingDocs, (listing: Object) => {
        similar.push(formatProject(listing));
      });

      this.emailQueueData.to = listerInfo.email;
      this.emailQueueData.jsonData = {
        agent: listerInfo,
        project: requestedProject,
        similarProject: similar,
        developer: organisationInfo
      };
      this.emailQueueData.subject = config.translator.email_subject.referral_request_granted;
      this.emailQueueData.template = '/referral/approval_developer.php';
    }

    return this.emailQueueData;
  }

  async searchProjectById(id: string): Promise<Object> {
    const result = await this.listing.searchProject(id);
    return result;
  }

  async searchListerById(id: number): Promise<Object> {
    const result = await this.lister.searchLister(id);
    return result;
  }

  async searchSimilarProject(organisationId: string, excludeProjectId: string): Promise<Object> {
    const result = await this.listing.searchProjectByOrganisation(
      organisationId,
      excludeProjectId,
      {
        pageToken: 2,
        pageSize: 2
      }
    );

    return result;
  }

  setDefaultEmailQueueData() {
    this.emailQueueData = {
      from: 'no-reply@rumah123.com',
      to: '',
      jsonData: {},
      subject: '',
      template: ''
    };
  }
}

export default new ReferralEmailQueueDataCollectorService(listingDao, listerDao);
