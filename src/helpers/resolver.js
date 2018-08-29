import _ from 'lodash';

export const resolveSolrResponse = respons =>
  _.get(respons, 'response.docs', []);

export const resolveRedisResponse = respons => {
  try {
    return _.get(JSON.parse(respons), 'data', []);
  } catch (err) {
    throw new Error('Cannot parse data Redis object, Data is invalid');
  }
};
