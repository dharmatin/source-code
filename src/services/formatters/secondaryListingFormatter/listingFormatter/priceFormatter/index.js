// @flow
import _ from 'lodash';
import type{ PriceRequest, Price } from './type';

const formatPrice = (request: PriceRequest): Array<Price> => {
  return request.category === 'rent' ? getRentPrice(request) : getSalePrice(request);
};

const getRentPrice = (request: PriceRequest): Array<Price> => {
  return [getRentOriginalPrice(request), getRentConvertedPrice(request)];
};

const getRentOriginalPrice = (request: PriceRequest): Price => {
  const price = periodicPrice(request.minPrice, request.period);
  let originalPrice: Price = {
    currency: 'Rp',
    min: price,
    max: price,
    type: request.category,
    label: (request.period).toLowerCase()
  };
  if (request.currency !== 'IDR') originalPrice.symbol = '~';

  return originalPrice;
};

const getRentConvertedPrice = (request: PriceRequest): Price => {
  let convertedPrice = {
    currency: 'Rp',
    type: request.category,
    min: 0,
    max: 0,
    label: ((request.period).toLowerCase() === 'monthly') ? 'yearly' : 'monthly',
    symbol: '~'
  };
  const convertedPriceByPeriod = getRentConvertedPriceByPeriod(convertedPrice.label, request.minPrice);
  const convertedPriceTotalUnit = convertedPriceByPeriod * ((isPerSquareMeter(request.unit)) ? request.size : 1);
  convertedPrice.min = convertedPriceTotalUnit;
  convertedPrice.max = convertedPriceTotalUnit;

  return convertedPrice;
};

const isPerSquareMeter = (unit: string): boolean => {
  const knownUnitFormat = ['/m²', '/mÂ²', 'msquare', '/m2'];
  return _.indexOf(knownUnitFormat, unit) >= 0;
};

const getSalePrice = (request: PriceRequest): Array<Price> => {
  let price: Price = {
    currency: 'Rp',
    min: request.minPrice,
    max: request.maxPrice,
    type: request.category,
  };
  if (!_.isEqual(request.installment, 0)) price.monthlyPayment = request.installment;
  if (!_.isEqual(request.currency, 'IDR')) price.symbol = '~';

  return [price];
};

const periodicPrice = (yearlyPrice: number, period: string): number => {
  if (period.toLowerCase() === 'monthly') return _.round(yearlyPrice / 12);
  if (period.toLowerCase() === 'daily') return _.round(yearlyPrice / 365);

  return yearlyPrice;
};

const getRentConvertedPriceByPeriod = (period: string, yearlyPrice: number): number => {
  return period === 'monthly' ? _.round(yearlyPrice / 12) : yearlyPrice;
};

export default formatPrice;
