// @flow
import _ from 'lodash';
import Serialization from 'php-serialization';
import type { Article } from './types';
import { getUrlSharpie, getDateTimeISO, getFirstParagraph, slugify } from '../../../libs/utility';
import config from '../../../config';

export const formatAttributesArticle = (
  articles: Object,
  params: Object
): Article => {
  const articleList = _.map(articles.response.docs, (item): Object => {
    const unserializeImage = Serialization.unserialize(item.meta_image_amazon);
    return {
      kind: 'article',
      id: item.id,
      url: config.url.article + '/' + slugify(item.title) + '-' + item.id,
      cover: {
        media: {
          type: 'image',
          url: getUrlSharpie(unserializeImage.key, true)
        }
      },
      title: item.title,
      snippet: getFirstParagraph(item.content),
      createdAt: getDateTimeISO(item.post_date),
      updatedAt: getDateTimeISO(item.post_modified),
      publishedAt: getDateTimeISO(item.pubdate)
    };
  });

  return {
    title: 'news',
    kind: 'article#list',
    articles: articleList,
    nextPageToken: Number(params.start) + 1,
    totalCount: articles.response.numFound,
  };
};
