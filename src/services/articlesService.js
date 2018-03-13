// @flow
import articleCore from '../dao/articles';
import listingCore from '../dao/listings';
import _ from 'lodash';
import { formatterArticles } from './formatters/formatterArticles';

export class ArticlesService {
  articles: Object;
  listings: Object;

  constructor(articles: Object, listings: Object) {
    this.articles = articles;
    this.listings = listings;
  }

  async getArticlesByTags(params: Object): Object {
    const listingSearch = await this.listings.searchProject(params.projectId);

    if (listingSearch.responseHeader.status !== 0) {
      throw new Error('Solr error project not found');
    }

    let start = Number(params.pageToken);
    if (start > 0) start = start - 1;
    const articleParams = {
      projectName: listingSearch.response.docs[0].project_name,
      developerName: listingSearch.response.docs[0].developer_name,
      start,
      rows: params.pageSize
    };

    const result = await this.articles.getArticleByTags(articleParams);
    if (result.responseHeader.status !== 0) {
      throw new Error('Solr error article not found!');
    }

    return formatterArticles(result.response, articleParams);
  }
}

export default new ArticlesService(articleCore, listingCore);
