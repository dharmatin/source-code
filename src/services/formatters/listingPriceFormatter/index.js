// @flow
import type {Price} from './types';

export const getPrices = (dataPrice: Object): Array<Price> => {
  const price = {};
  price.type = 'new';
  price.currency = 'IDR';
  price.min = Number(dataPrice.priceMin);
  price.max = Number(dataPrice.priceMax);

  return [{...price}];
};
