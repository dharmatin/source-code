// @flow
import _ from 'lodash';
import moment from 'moment';
import referralDao from '../dao/referrals';
import listingDao from '../dao/listings';
import emailQueueService from './emailQueueService';
import { extractListingId } from '../libs/utility';
import { formatStatusReferral } from './formatters/referralFormatter';
import emailReferralRequestDeveloperDataCollector from './referrals/emails/dataCollectors/referralRequestDeveloper';
import emailReferralRequestAgentDataCollector from './referrals/emails/dataCollectors/referralRequestAgent';

export class ReferralRequestService {
  referrals: Object;
  listings: Object;
  referralListingId: Object;
  listerId: number;
  listingId: string;
  projectId: number;
  referralCode: string;

  constructor(referrals: Object, listings: Object) {
    this.referrals = referrals;
    this.listings = listings;
  }

  async requestReferral(params: Object): Promise<string> {
    let message = 'Failed';

    const agentParam = {
      userId: params.listerId,
      adsProjectId: extractListingId(params.listingId).id,
      propertyType: extractListingId(params.listingId).type,
    };
    const { response: listing } = await this.listings.searchProject(
      params.listingId
    );
    if (listing.numFound > 0 && listing.docs[0].is_referral === 1) {
      (await this.checkingReferral(agentParam))
        ? (await this.requestingReferral(
            _.assign(agentParam, {
              messageRequest: params.messageRequest,
              propertyCategory: 's',
            }),
            params.isSubscribed
          ))
          ? (message = 'Success')
          : (message = 'Failed')
        : (message = 'Failed');
    }
    if (message === 'Success') {
      this.handlerEmailToDeveloper(params);
      this.handlerEmailToAgent(params);
    }
    return message;
  }

  handlerEmailToDeveloper(params: Object) {
    const emailToDeveloper = emailReferralRequestDeveloperDataCollector.collect(
      {
        listingId: params.listingId,
        listerId: params.listerId,
        referralCode: '',
      }
    );
    emailToDeveloper
      .then((data: Object) => {
        const queuedEmail = emailQueueService
          .to(data.to)
          .from(data.from)
          .subject(data.subject)
          .jsonData(data.jsonData)
          .template(data.template)
          .save();
        queuedEmail.catch((err: any) => {
          throw new Error(err);
        });
      })
      .catch((err: any) => {
        throw new Error(err);
      });
  }

  handlerEmailToAgent(params: Object) {
    const emailToAgent = emailReferralRequestAgentDataCollector.collect({
      listingId: params.listingId,
      listerId: params.listerId,
      referralCode: '',
    });
    emailToAgent
      .then((data: Object) => {
        const queuedEmail = emailQueueService
          .to(data.to)
          .from(data.from)
          .subject(data.subject)
          .jsonData(data.jsonData)
          .template(data.template)
          .sendDate(moment().format('YYYY-MM-DD HH:mm:ss.SSS'))
          .save();
        queuedEmail.catch((err: any) => {
          throw new Error(err);
        });
      })
      .catch((err: any) => {
        throw new Error(err);
      });
  }

  async requestingReferral(
    agentParam: Object,
    isSubscribed: boolean
  ): Promise<boolean> {
    const request = await this.referrals.requestReferral(
      agentParam,
      isSubscribed
    );
    return parseInt(request.userId) === parseInt(agentParam.userId);
  }

  async checkingReferral(agentParam: Object): Promise<boolean> {
    const result = await this.referrals.checkReferral(agentParam);
    return _.isEmpty(result);
  }

  async getLatestRefferal(listerId: number, listingId: string): any {
    let referral = {};
    const listing = await this.listings.searchProject(listingId);
    if (
      listing.response.numFound > 0 &&
      listing.response.docs[0].is_referral === 1
    ) {
      referral = await this.referrals.getLatestReferralRequest({
        userId: listerId,
        adsProjectId: extractListingId(listingId).id,
      });
    }

    return formatStatusReferral(referral, listing.response.docs[0]);
  }
}

export default new ReferralRequestService(referralDao, listingDao);
