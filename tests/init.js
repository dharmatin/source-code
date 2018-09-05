// @flow
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon, { createSandbox } from 'sinon';
import sinonChai from 'sinon-chai';

declare var describe: any;
declare var it: any;
declare var afterEach: any;
declare var before: any;

chai.use(sinonChai);
chai.use(chaiAsPromised);
const sandbox = createSandbox();

global.sinon = sinon;
global.chai = chai;
global.sandbox = sandbox;
global.expect = expect;
