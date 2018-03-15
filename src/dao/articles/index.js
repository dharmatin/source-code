// @flow
import _ from 'lodash';
import SolrClient from '../../libs/connections/SolrClient';
const LISTING_CORE = 'news';
const { client: articleClient } = new SolrClient(LISTING_CORE);

export default {
  getArticleByTags: async (params: Object): Object => {
    let conditionQ = `tag:("${params.projectName}" OR "${
      params.developerName
    }") AND post_status:publish AND -category:post-format-video`;
    const queryGetArticleByTags = articleClient
      .createQuery()
      .q(conditionQ)
      .sort({ pubdate: 'DESC' })
      .start(params.start)
      .rows(params.rows);

    return articleClient.searchAsync(queryGetArticleByTags);
  },
};
