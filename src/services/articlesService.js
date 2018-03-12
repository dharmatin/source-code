// @flow
import articleCore from '../dao/articles';
import { formatterArticles } from './formatters/formatterArticles';

export class ArticleService {
  articles: Object;

  constructor(articles: Object) {
    this.articles = articles;
  }

  async getArticlesByCategory(params: Object, lang: string): Object {
    const result = await this.articles.searchByCategory(params, lang);
    const status = result.responseHeader.status;
    if (status !== 0) {
      throw new Error('Solr search error !');
    }

    return formatterArticles(result);
  }
}

export default new ArticleService(articleCore);
