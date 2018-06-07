// @flow
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import formatPrice from '../../src/services/formatters/secondaryListingFormatter/listingFormatter/priceFormatter';
import type { PriceRequest } from '../../src/services/formatters/secondaryListingFormatter/listingFormatter/priceFormatter/type';

declare var describe: any;
declare var it: any;
declare var afterEach: any;

chai.use(sinonChai);
const sandbox = sinon.createSandbox();
const { expect } = chai;

describe("Listing's Price Formatter", () => {
  afterEach(() => {
    sandbox.restore();
  });
  describe('#format price with currency IDR and category  sale', () => {
    it('should be return price format with sale category', (): any => {
      const request: PriceRequest = {
        category: 'sale',
        currency: 'IDR',
        maxPrice: 75000000,
        minPrice: 75000000,
        period: '',
        unit: '',
        size: 0,
        installment: 0
      };

      const response = formatPrice(request);
      expect(response).to.be.an('array').to.deep.include({
        currency: 'Rp',
        min: 75000000,
        max: 75000000,
        type: 'sale'
      });
    });
  });

  describe('#format price have installment and category sale with IDR currency', () => {
    it('should be return price format with sale category and have monthly payment', (): any => {
      const request: PriceRequest = {
        category: 'sale',
        currency: 'IDR',
        maxPrice: 75000000,
        minPrice: 75000000,
        period: '',
        unit: '',
        size: 0,
        installment: 6250000
      };

      const response = formatPrice(request);
      expect(response).to.be.an('array').to.deep.include({
        currency: 'Rp',
        min: 75000000,
        max: 75000000,
        type: 'sale',
        monthlyPayment: 6250000
      });
    });
  });

  describe('#format price with non IDR currency and have installment value', () => {
    it('should be return price format with sale category and have (~) symbol', (): any => {
      const request: PriceRequest = {
        category: 'sale',
        currency: 'USD',
        maxPrice: 75000000,
        minPrice: 75000000,
        period: '',
        unit: '',
        size: 0,
        installment: 6250000
      };

      const response = formatPrice(request);
      expect(response).to.be.an('array').to.deep.include({
        currency: 'Rp',
        min: 75000000,
        max: 75000000,
        type: 'sale',
        monthlyPayment: 6250000,
        symbol: '~'
      });
    });
  });

  describe('#format price rent with IDR currency, period yearly and unit is non /square meter', () => {
    it('should be return price format with rent category and have yearly price and monthly price with symbol ~', (): any => {
      const request: PriceRequest = {
        category: 'rent',
        currency: 'IDR',
        maxPrice: 75000000,
        minPrice: 75000000,
        period: 'yearly',
        unit: 'Total',
        size: 10,
        installment: 0
      };

      const response = formatPrice(request);
      expect(response).to.be.an('array').to.deep.include({
        currency: 'Rp',
        min: 75000000,
        max: 75000000,
        type: 'rent',
        label: 'yearly'
      }, { currency: 'Rp',
        type: 'rent',
        min: 6250000,
        max: 6250000,
        label: 'monthly',
        symbol: '~'
      });
    });
  });

  describe('#format rent price with IDR, period monthly and non /square meter unit', () => {
    it('should be return price format with rent category and have monthly price and yearly price with symbol ~', (): any => {
      const request: PriceRequest = {
        category: 'rent',
        currency: 'IDR',
        maxPrice: 75000000,
        minPrice: 75000000,
        period: 'monthly',
        unit: 'Total',
        size: 10,
        installment: 0
      };

      const response = formatPrice(request);
      expect(response).to.be.an('array').to.deep.include({
        currency: 'Rp',
        min: 6250000,
        max: 6250000,
        type: 'rent',
        label: 'monthly'
      }, { currency: 'Rp',
        type: 'rent',
        min: 75000000,
        max: 75000000,
        label: 'yearly',
        symbol: '~'
      });
    });
  });

  describe('#format rent price with IDR, period daily and non /square meter unit', () => {
    it('should be return price format with rent category and have daily price and monthly price with symbol ~', (): any => {
      const request: PriceRequest = {
        category: 'rent',
        currency: 'IDR',
        maxPrice: 75000000,
        minPrice: 75000000,
        period: 'daily',
        unit: 'Total',
        size: 10,
        installment: 0
      };

      const response = formatPrice(request);
      expect(response).to.be.an('array').to.deep.include({
        currency: 'Rp',
        min: 205479,
        max: 205479,
        type: 'rent',
        label: 'daily'
      }, { currency: 'Rp',
        type: 'rent',
        min: 6250000,
        max: 6250000,
        label: 'monthly',
        symbol: '~'
      });
    });
  });

  describe('#format rent price with non IDR currency, period daily and non /square meter unit', () => {
    it('should be return price format with rent category and have daily price with symbol ~ and monthly price with symbol ~', (): any => {
      const request: PriceRequest = {
        category: 'rent',
        currency: 'USD',
        maxPrice: 75000000,
        minPrice: 75000000,
        period: 'daily',
        unit: 'Total',
        size: 10,
        installment: 0
      };

      const response = formatPrice(request);
      expect(response).to.be.an('array').to.deep.include({
        currency: 'Rp',
        min: 205479,
        max: 205479,
        type: 'rent',
        label: 'daily',
        symbol: '~'
      }, { currency: 'Rp',
        type: 'rent',
        min: 6250000,
        max: 6250000,
        label: 'monthly',
        symbol: '~'
      });
    });
  });

  describe('#format rent price with IDR, period daily and /square meter unit', () => {
    it('should be return price format with rent category and have daily price and monthly price * size with symbol ~', (): any => {
      const request: PriceRequest = {
        category: 'rent',
        currency: 'IDR',
        maxPrice: 75000000,
        minPrice: 75000000,
        period: 'daily',
        unit: '/m²',
        size: 10,
        installment: 0
      };

      const response = formatPrice(request);
      expect(response).to.be.an('array').to.deep.include({
        currency: 'Rp',
        min: 205479,
        max: 205479,
        type: 'rent',
        label: 'daily'
      }, { currency: 'Rp',
        type: 'rent',
        min: 6250000,
        max: 6250000,
        label: 'monthly',
        symbol: '~'
      });
    });
  });

  describe('#format rent price with non IDR, period daily and /square meter unit', () => {
    it('should be return price format with rent category and have daily price with symbol ~ and monthly price * size with symbol ~', (): any => {
      const request: PriceRequest = {
        category: 'rent',
        currency: 'USD',
        maxPrice: 75000000,
        minPrice: 75000000,
        period: 'daily',
        unit: '/m²',
        size: 10,
        installment: 0
      };

      const response = formatPrice(request);
      expect(response).to.be.an('array').to.deep.include({
        currency: 'Rp',
        min: 205479,
        max: 205479,
        type: 'rent',
        label: 'daily',
        symbol: '~'
      }, { currency: 'Rp',
        type: 'rent',
        min: 6250000,
        max: 6250000,
        label: 'monthly',
        symbol: '~'
      });
    });
  });
});
