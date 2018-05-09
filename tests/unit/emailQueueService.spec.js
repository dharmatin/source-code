import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import EmailQueueDao from '../../src/dao/emailQueue';
import { EmailQueueService } from '../../src/services/emailQueueService';

declare var describe: any;
declare var it: any;
declare var afterEach: any;

chai.use(chaiAsPromised);
chai.use(sinonChai);

const { expect } = chai;
let sandbox = null;

describe('Email Queue services', () => {
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  context('#save', () => {
    /* eslint camelcase: ["error", {properties: "never"}] */
    const successFake = {
      email_queue: {
        dataValues: {},
      },
    };

    it('Should be return true if the data success save to database', async(): any => {
      sandbox.stub(EmailQueueDao, 'save').callsFake(() => successFake);

      const emailQueueService = new EmailQueueService(EmailQueueDao);
      const result = await emailQueueService
        .to('dharmatin@gmail.com')
        .from('Rumah123.com')
        .subject('Referral Success')
        .template('/test')
        .jsonData({ ucok: 'baba' })
        .save();

      expect(result).to.equal(true);
    });

    const failedFake = {};
    it('Should be return false if the data failed save to database', async(): any => {
      sandbox.stub(EmailQueueDao, 'save').callsFake(() => failedFake);
      const emailQueueService = new EmailQueueService(EmailQueueDao);
      const result = await emailQueueService
        .to('dharmatin@gmail.com')
        .from('Rumah123.com')
        .subject('Referral Success')
        .template('/test')
        .jsonData({ ucok: 'baba' })
        .save();
      expect(result).to.equal(false);
    });
  });
});
