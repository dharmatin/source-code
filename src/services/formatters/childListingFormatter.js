import _ from 'lodash';

export const getChildListingsInfo = (childListings, lang) => {
  _.map(childListings, (value) => {
    console.log(value);
  });
};
