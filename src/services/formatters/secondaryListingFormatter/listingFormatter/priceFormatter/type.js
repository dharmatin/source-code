// @flow

export type Price = {
  type: string,
  currency: string,
  symbol?: string,
  min: number,
  max: number,
  monthlyPayment?: number,
  label?: string
};

export type PriceRequest = {
  minPrice: number,
  maxPrice: number,
  currency: string,
  period: string,
  unit: string,
  category: string,
  size: number,
  installment: number
};
