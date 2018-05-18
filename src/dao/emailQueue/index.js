// @flow
import Sequelize from 'sequelize';
import MysqlClient from '../../libs/connections/MysqlClient';
import type { EmailQueue } from './type';

const DATABASE_NAME = 'default';
const { client: DBClient } = new MysqlClient(DATABASE_NAME);

class EmailQueueDao {
  emailQueueModel: Object;
  EmailQueue: EmailQueue;
  constructor() {
    this.emailQueueModel = DBClient.define('email_queue', {
      queueId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'email_queue_id',
      },
      subject: {
        type: Sequelize.STRING(50),
        field: 'subject',
      },
      from: {
        type: Sequelize.STRING(50),
        field: 'from',
      },
      to: {
        type: Sequelize.STRING(50),
        field: 'to',
      },
      cc: {
        type: Sequelize.STRING(50),
        field: 'cc',
      },
      bcc: {
        type: Sequelize.STRING(50),
        field: 'bcc',
      },
      data: {
        type: Sequelize.STRING(250),
        field: 'data',
      },
      srcTemplate: {
        type: Sequelize.STRING(50),
        field: 'src_template',
      },
      body: {
        type: Sequelize.TEXT,
        field: 'body',
      },
      status: {
        type: Sequelize.TINYINT(4),
        field: 'status',
      },
      createdDate: {
        type: Sequelize.DATE,
        field: 'created_date',
      },
      sendDate: {
        type: Sequelize.DATE,
        field: 'send_date',
      },
      sentDate: {
        type: Sequelize.DATE,
        field: 'sent_date',
      },
    });
  }

  async save(value: EmailQueue): Promise<Object> {
    const result = await this.emailQueueModel.create(value);
    return result;
  }
}

export default new EmailQueueDao();
