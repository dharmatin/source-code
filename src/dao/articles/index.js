// @flow
import _ from 'lodash';
import SolrClient from '../../libs/connections/SolrClient';
const LISTING_CORE = 'news';
const { client: articleClient } = new SolrClient(LISTING_CORE);

export default {
  getArticleByTags: async (tags: Array<string>, paging: Object): Object => {
    const queryTags = _.map(tags, (item): string => {
      return '"' + item + '"';
    }).join(' OR ');

    const conditionQ = `tag:(${queryTags}) AND post_status:publish AND -category:post-format-video`;

    const pageStart = (paging.pageToken - 1) * paging.pageSize;

    const queryGetArticleByTags = articleClient
      .createQuery()
      .q(conditionQ)
      .sort({ pubdate: 'DESC' })
      .start(pageStart)
      .rows(paging.pageSize);

    return articleClient.searchAsync(queryGetArticleByTags);
  },
};
