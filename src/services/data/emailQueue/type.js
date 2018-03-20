// @flow
export type EmailQueueData = {
  to: string,
  from: string,
  template: string,
  jsonData: Object,
  subject: string
};
