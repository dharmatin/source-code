// @flow
import type {Price} from './types';

export const getPrices = (dataPrice: Object): Array<Price> => {
  const price = {};
  price.type = 'new';
  price.currency = 'IDR';
  price.min = Number(dataPrice.price_min);
	price.max = Number(dataPrice.price_max);
	
  return [{...price}];
};