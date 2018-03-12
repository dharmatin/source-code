// @flow
import _ from 'lodash';
import SolrClient from '../../libs/connections/SolrClient';
const LISTING_CORE = 'news';
const { client: articleClient } = new SolrClient(LISTING_CORE);

export default {
  searchByCategory: async(params: Object): Object => {
    let conditionQ = `(tag:(${params.projectName}) OR tag:(${params.developerName})) AND post_status:publish`;
    const queryListingByCategory = articleClient.createQuery().q(conditionQ).start(params.start).rows(params.rows);

    return articleClient.searchAsync(queryListingByCategory);
  }
};
