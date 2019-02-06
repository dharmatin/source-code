/* eslint-disable */
import config from '../../src/config';
import { ListerService } from '../../src/services/listerService';
import listerCore from '../../src/dao/listers';
import searchListerResponse from '../fixture/searchListerResponse';

describe('Format Response Search Listing', () => {
  beforeEach(() => {
    config.lang = 'id';
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should be correct format response getProjectProfile', async () => {
    sandbox
      .stub(listerCore, 'searchLister')
      .callsFake(() => searchListerResponse);
    const getProjectProfile = new ListerService(listerCore);
    const result = await getProjectProfile.getListerProfile('70491');
    return expect(result).to.deep.equal({
      contact: {
        emails: ['123.superqa@gmail.com'],
        phones: [
          {
            label: 'LandLine',
            number: '+6282213929253',
          },
          {
            label: 'Whatsapp',
            number: '6281294465655',
          },
        ],
      },
      createdAt: '2015-04-10T09:54:39+07:00',
      id: '70491',
      image: {
        type: 'image',
        url: 'https://dm38pn59zg67e.cloudfront.net/photo/no_photo.jpg',
      },
      name: 'Syela Syahlula',
      type: 'agent',
      website: 'localhost/agen-properti/rumah-123com/syela-syahlula-70491',
    });
  });
});
