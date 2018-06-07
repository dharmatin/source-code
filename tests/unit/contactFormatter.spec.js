
// @flow
import chai from 'chai';
import formatContact from '../../src/services/formatters/secondaryListingFormatter/contactFormatter';
import type { ContactRequest } from '../../src/services/formatters/secondaryListingFormatter/contactFormatter/type';

declare var describe: any;
declare var it: any;
declare var afterEach: any;

const { expect } = chai;

describe("Listing's Contact Formatter", () => {
  describe('#format contact with phone only', () => {
    it('should be return contact with phone only', (): any => {
      const request: ContactRequest = {
        phone: '6221123123'
      };

      const response = formatContact(request);
      expect(response).to.deep.equal({
        phones: [
          {
            label: 'phone',
            number: '+6221123123'
          }
        ]
      });
    });
  });

  describe('#format contact with phone and handphone only', () => {
    it('should be return contact with phone only', (): any => {
      const request: ContactRequest = {
        phone: '6221123123',
        handPhone: '628878762151'
      };

      const response = formatContact(request);
      expect(response).to.deep.equal({
        phones: [
          {
            label: 'phone',
            number: '+6221123123'
          },
          {
            label: 'handphone',
            number: '+628878762151'
          }
        ]
      });
    });
  });

  describe('#format contact with multiple phone and handphone', () => {
    it('should be return contact with multiple phone and handphone', (): any => {
      const request: ContactRequest = {
        phone: '6221123123, 62121112',
        handPhone: '628878762151'
      };

      const response = formatContact(request);
      expect(response).to.deep.equal({
        phones: [
          {
            label: 'phone',
            number: '+6221123123'
          },
          {
            label: 'phone',
            number: '+62121112'
          },
          {
            label: 'handphone',
            number: '+628878762151'
          }
        ]
      });
    });
  });

  describe('#format contact with phone, handphone, email', () => {
    it('should be return contact with phone, handphone, email', (): any => {
      const request: ContactRequest = {
        phone: '6221123123',
        handPhone: '628878762151',
        email: 'dharmatin@gmail.com'
      };

      const response = formatContact(request);
      expect(response).to.deep.equal({
        phones: [
          {
            label: 'phone',
            number: '+6221123123'
          },
          {
            label: 'handphone',
            number: '+628878762151'
          }
        ],
        emails: ['dharmatin@gmail.com']
      });
    });
  });

  describe('#format contact with phone, handphone, email, whatsapp', () => {
    it('should be return contact with phone, handphone, email and whatsapp', (): any => {
      const request: ContactRequest = {
        phone: '6221123123',
        handPhone: '628878762151',
        email: 'dharmatin@gmail.com',
        whatsApp: '6281231231'
      };

      const response = formatContact(request);
      expect(response).to.deep.equal({
        phones: [
          {
            label: 'phone',
            number: '+6221123123'
          },
          {
            label: 'handphone',
            number: '+628878762151'
          }
        ],
        emails: ['dharmatin@gmail.com'],
        whatsApp: ['6281231231']
      });
    });
  });

  describe('#format contact with phone, handphone, email, whatsapp, bbpin', () => {
    it('should be return contact with phone, handphone, email, whatsapp and bbm', (): any => {
      const request: ContactRequest = {
        phone: '6221123123',
        handPhone: '628878762151',
        email: 'dharmatin@gmail.com',
        whatsApp: '6281231231',
        bbPin: 'CFG1234'
      };

      const response = formatContact(request);
      expect(response).to.deep.equal({
        phones: [
          {
            label: 'phone',
            number: '+6221123123'
          },
          {
            label: 'handphone',
            number: '+628878762151'
          }
        ],
        emails: ['dharmatin@gmail.com'],
        whatsApp: ['6281231231'],
        bbms: ['CFG1234']
      });
    });
  });
});
