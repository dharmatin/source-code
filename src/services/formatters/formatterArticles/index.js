// @flow
import _ from 'lodash';
import type { Article } from './types';
import { getNewsThumbnail } from '../../../libs/utility';

export const formatterArticles = (
  articleLists: Object,
  params: Object
): Array<Article> => {
  const article = [];
  _.map(articleLists, item => {
    _.map(item.docs, doc => {
      const articleList = {};
      articleList.kind = 'article';
      articleList.id = doc.id;
      articleList.url = doc.title;
      articleList.thumbnail = getNewsThumbnail(doc.meta_image_amazon);
      articleList.cover = '';
      articleList.title = doc.title;
      articleList.snippet = '';
      articleList.body = doc.content;
      articleList.createdAt = doc.post_date;
      articleList.updatedAt = doc.post_modified;
      articleList.publishedAt = doc.pubdate;

      article.push(articleList);
    });
  });

  return [{
    title: 'nes',
    kind: 'sdfdsf',
    articles: article,
    nextPageToken: 1,
    totalCount: 10,
  }];
};
