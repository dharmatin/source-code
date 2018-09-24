import _ from 'lodash';

export const resolveSolrResponse = respons => {
  const items = _.get(respons, 'response.docs', []);
  return {
    items: items,
    numFound: respons.response.numFound,
  };
};

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
  const nGroups = grouped[groupBy].ngroups;
  const items = _.map(
    grouped[groupBy].groups,
    (group: Array): any => group.groupValue
  );
  return {
    numFound: nGroups,
    items: items,
  };
};
