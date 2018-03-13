// @flow
import _ from 'lodash';
import Serialization from 'php-serialization';
import type { Article } from './types';
import { getUrlSharpie, getDateTimeISO, getSnippetTagParagraph } from '../../../libs/utility';

export const formatterArticles = (
  articleLists: Object,
  params: Object
): Array<Article> => {
  const articles = [];
  _.map(articleLists, item => {
    _.map(item.docs, doc => {
      const unserializeImage = Serialization.unserialize(doc.meta_image_amazon);
      const articleList = {};
      articleList.kind = 'article';
      articleList.id = doc.id;
      articleList.url = doc.title;
      articleList.cover = {
        media: {
          type: 'image',
          url: getUrlSharpie(unserializeImage.key)
        }
      };
      articleList.title = doc.title;
      articleList.snippet = getSnippetTagParagraph(doc.content);
      articleList.createdAt = getDateTimeISO(doc.post_date);
      articleList.updatedAt = getDateTimeISO(doc.post_modified);
      articleList.publishedAt = getDateTimeISO(doc.pubdate);

      articles.push(articleList);
    });
  });

  return [{
    title: 'news',
    kind: 'article#list',
    articles,
    nextPageToken: Number(params.start) + 1,
    totalCount: articleLists.response.numFound,
  }];
};
