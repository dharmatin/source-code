// @flow
import _ from 'lodash';
import Sequelize from 'sequelize';
import emailQueueDao from '../dao/emailQueue';
import type { EmailQueue } from '../dao/emailQueue/type';

export class EmailQueueService {
  emailQueueDao: Object;
  emailFrom: string;
  emailTo: string;
  emailSubject: string;
  emailJsonData: Object;
  emailTemplate: string;
  emailQueue: Object | EmailQueue;
  emailSendDate: string;

  constructor(objectDao: Object) {
    this.emailQueue = {};
    this.emailFrom = '';
    this.emailTo = '';
    this.emailSubject = '';
    this.emailJsonData = {};
    this.emailTemplate = '';
    this.emailQueueDao = objectDao;
    this.emailSendDate = '';
  }

  from(from: string): Object {
    this.emailFrom = from;
    return this;
  }

  to(to: string): Object {
    this.emailTo = to;
    return this;
  }

  subject(subject: string): Object {
    this.emailSubject = subject;
    return this;
  }

  jsonData(data: Object): Object {
    this.emailJsonData = data;
    return this;
  }

  template(src: string): Object {
    this.emailTemplate = src;
    return this;
  }

  sendDate(date: string): Object {
    this.emailSendDate = date;
    return this;
  }

  async save(): Promise<boolean> {
    this.setEmailQueue(this);
    const result = await this.emailQueueDao.save(this.getEmailQueue());

    return !_.isEmpty(result);
  }

  getEmailQueue(): EmailQueue {
    return this.emailQueue;
  }

  setEmailQueue(self: Object) {
    this.emailQueue.queueId = Sequelize.DEFAULT;
    this.emailQueue.subject = self.emailSubject;
    this.emailQueue.from = self.emailFrom;
    this.emailQueue.to = self.emailTo;
    this.emailQueue.cc = '';
    this.emailQueue.bcc = '';
    this.emailQueue.data = JSON.stringify(self.emailJsonData);
    this.emailQueue.srcTemplate = self.emailTemplate;
    this.emailQueue.body = '';
    this.emailQueue.status = -1;
    this.emailQueue.createdDate = Sequelize.fn('NOW', 3);
    this.emailQueue.sendDate = _.isEmpty(self.emailSendDate) ?
      Sequelize.fn('NOW', 3) :
      self.emailSendDate;
    this.emailQueue.sentDate = Sequelize.DEFAULT;
  }
}

export default new EmailQueueService(emailQueueDao);
