import _ from 'lodash';

export const resolveSolrResponse = respons => _.get(respons.response, 'docs', []);
