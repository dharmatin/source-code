// @flow
import articleCore from '../dao/articles';
import listingCore from '../dao/listings';
import _ from 'lodash';
import { formatAttributesArticle } from './formatters/articlesFormatter';

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

    const start = (params.page - 1) * params.limit;

    const articleParams = {
      projectName: listingSearch.response.docs[0].project_name,
      developerName: listingSearch.response.docs[0].developer_name,
      start,
      rows: params.limit
    };

    const result = await this.articles.getArticleByTags(articleParams);
    if (result.responseHeader.status !== 0) {
      throw new Error('Solr error article not found!');
    }

    return {
      title: 'news',
      kind: 'article#list',
      articles: formatAttributesArticle(result.response.docs),
      nextPageToken: Number(params.start) + 1,
      totalCount: result.response.numFound,
    };
  }
}

export default new ArticlesService(articleCore, listingCore);
