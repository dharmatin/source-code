// @flow
export type EmailQueue = {
  queueId: number,
  subject: string,
  from: string,
  to: string,
  cc: string,
  bcc: string,
  data: string,
  srcTemplate: string,
  body: string,
  status: number,
  createdDate: Date,
  sendDate: Date,
  sentDate: Date,
};
