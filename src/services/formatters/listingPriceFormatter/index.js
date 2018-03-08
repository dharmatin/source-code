// @flow
import type {Price} from './types';

export const formatterPrices = (dataPrice: Object): Array<Price> => {
  const price = {};
  price.type = 'new';
  price.currency = 'IDR';
  price.min = Number(dataPrice.priceMin);
  price.max = Number(dataPrice.priceMax);

  return [{...price}];
};

export const formatterPrice = (dataPrice: Object): Price => {
  const price = {};
  price.type = 'new';
  price.currency = 'IDR';
  price.min = Number(dataPrice.priceMin);
  price.max = Number(dataPrice.priceMax);

  return price;
};
