// @flow
import articleCore from '../dao/articles';
import listingCore from '../dao/listings';
import { formatAttributesArticle } from './formatters/articlesFormatter';

export class ArticlesService {
  articles: Object;
  listings: Object;

  constructor(articles: Object, listings: Object) {
    this.articles = articles;
    this.listings = listings;
  }

  async getArticlesByTags(projectId: string, pagingRequest: Object): Object {
    const listingSearch = await this.listings.searchProject(projectId);

    if (listingSearch.responseHeader.status !== 0) {
      throw new Error('Solr error project not found');
    }

    if (listingSearch.response.numFound === 0) return {};

    const tags = [
      listingSearch.response.docs[0].project_name,
      listingSearch.response.docs[0].developer_name,
    ];

    const result = await this.articles.getArticleByTags(tags, pagingRequest);

    if (result.responseHeader.status !== 0) {
      throw new Error('Solr error article not found!');
    }

    return formatAttributesArticle(result, pagingRequest);
  }
}

export default new ArticlesService(articleCore, listingCore);
