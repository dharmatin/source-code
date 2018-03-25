// @flow
import _ from 'lodash';
import projectService from '../../projectProfileService';
import listerService from '../../listerService';
import type { EmailQueueData, ReferralCollectorData, ProjectProfileRequester } from '../data/types';
import { formatProject, formatLister, formatOrganisation } from '../../formatters/emailQueueDataCollectorFormatter';
import config from '../../../config';

const EMAIL_FROM = config.EMAIL_FROM;
const DEFAULT_PAGE_TOKEN = 2;
const DEFAULT_PAGE_SIZE = 2;

export default class EmailQueueDataCollector {
  projectService: Object;
  listerService: Object;
  emailQueueData: EmailQueueData;

  constructor() {
    this.projectService = projectService;
    this.listerService = listerService;
  }

  async queuedDataForLister(params: ReferralCollectorData): Promise<EmailQueueData> {
    const project = await this.getProjectProfile({id: params.listingId, referralCode: params.referralCode});
    const lister = await this.getListerProfile(params.listerId);
    const listerFormatted = formatLister(lister);
    let similarProject = [];
    let similarProjectFormatted = [];
    let jsonData = {};

    if (!_.isEmpty(project)) {
      const projectFormatted = formatProject(project);
      const organisationsFormatted = formatOrganisation(project);

      if (!_.isNil(project.organisations)) {
        similarProject = await this.searchSimilarProject(project.organisations[0].id, params.listingId);
        _.map(similarProject.items, (value: Object) => {
          similarProjectFormatted.push(formatProject(value));
        });
      }

      jsonData = {
        agent: listerFormatted,
        project: projectFormatted,
        similarProject: similarProjectFormatted,
        developer: organisationsFormatted
      };
    }

    return {
      subject: '',
      template: '',
      from: EMAIL_FROM,
      to: listerFormatted.email,
      jsonData: jsonData
    };
  }

  async queuedDataForOrganisation(params: ReferralCollectorData): Promise<EmailQueueData> {
    // FOR DATA EMAIL REFERRAL SENT TO DEVELOPER
    const lister = await this.getListerProfile(params.listerId);
    const listerFormatted = formatLister(lister);
    const project = await this.getProjectProfile({id: params.listingId, referralCode: params.referralCode});
    let jsonData = {};

    if (!_.isEmpty(project)) {
      const organisationsFormatted = formatOrganisation(project);
      const projectByOrganisation = await this.getAllProjectByOrganisation(project.organisations[0].id);

      jsonData = {
        agent: listerFormatted,
        project: organisationsFormatted,
        developerDashboard: projectByOrganisation
      };
    }

    return {
      subject: '',
      template: '',
      from: EMAIL_FROM,
      to: listerFormatted.email,
      jsonData: jsonData
    };
  }

  async getAllProjectByOrganisation(developerCompanyId: number): Promise<Object> {
    const result = await this.projectService.getProjectByOrganisation(developerCompanyId,
      '', {
        'pageToken': 1,
        'pageSize': 9999
      }
    );
    return result;
  }

  async getProjectProfile(params: ProjectProfileRequester): Promise<Object> {
    const result = await this.projectService.getProjectProfile({id: params.id, referralCode: params.referralCode, mustCounting: false});
    return result;
  }

  async getListerProfile(id: number): Promise<Object> {
    const result = await this.listerService.getListerProfile(id);
    return result;
  }

  async searchSimilarProject(organisationId: string, excludeProjectId: string): Promise<Object> {
    const result = await this.projectService.getProjectByOrganisation(
      organisationId,
      excludeProjectId,
      {
        pageToken: DEFAULT_PAGE_TOKEN,
        pageSize: DEFAULT_PAGE_SIZE
      }
    );

    return result;
  }

  setDefaultEmailQueueData() {
    this.emailQueueData = {
      from: EMAIL_FROM,
      to: '',
      jsonData: {},
      subject: '',
      template: ''
    };
  }

  getEmailQueueData(): EmailQueueData {
    return this.emailQueueData;
  }
  setEmailQueueData(data: EmailQueueData) {
    this.emailQueueData = data;
  }
}
