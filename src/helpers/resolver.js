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

export const resolveSolrGroupResponse = (
  response: Object,
  groupBy: string
): Object => {
  const { grouped } = response;
  return _.map(
    grouped[groupBy].groups,
    (group: Array): any => group.groupValue
  );
};
