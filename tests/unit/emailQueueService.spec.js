// @flow
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
const sandbox = sinon.createSandbox();

describe('Email Queue services', () => {
  afterEach(() => {
    sandbox.restore();
  });
  it('Should be return true if the data success save to database', async(): any => {
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

  it('Should be return false if the data failed save to database', async(): any => {
    sandbox.stub(EmailQueueDao, 'save').callsFake((): boolean => false);
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
