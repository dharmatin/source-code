// @flow
export type ReferralCollectorData = {
  listingId: string,
  listerId: number,
  referralCode: string,
};

export type ProjectProfileRequester = {
  id: string,
  referralCode: string,
};

export type EmailQueueData = {
  from: string,
  to: string,
  jsonData: Object,
  subject: string,
  template: string,
};

export interface DataCollector {
  collect(params: ReferralCollectorData): Promise<EmailQueueData>,
}
