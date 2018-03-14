// @flow
export type AgentReferral = {
  agentReferralId: number,
  userId: number,
  adsProjectId: number,
  adsId: number,
  propertyType: string,
  propertyCategory: string,
  referralCode: string,
  referralStatus: number,
  referralReason: string,
  createdDate: Date,
  approvedDate: Date,
  rejectedDate: Date,
  removedDate: Date
};
