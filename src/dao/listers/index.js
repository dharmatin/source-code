// @flow
import _ from 'lodash';
import SolrClient from '../../libs/connections/SolrClient';
const LISTER_CORE = 'user';
const { client: listerClient } = new SolrClient(LISTER_CORE);

export default {
  searchLister: async (id: string): Object => {
    const conditionQ = `id:${id}`;
    const queryListerById = listerClient.createQuery().q(conditionQ);
    return listerClient.searchAsync(queryListerById);
  }
};
