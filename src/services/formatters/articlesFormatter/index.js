// @flow
import _ from 'lodash';
import Serialization from 'php-serialization';
import type { Article } from './types';
import { getUrlSharpie, toISOFormatting, getFirstParagraph, slugify } from '../../../libs/utility';
import config from '../../../config';

export const formatAttributesArticle = (
  articles: Array<Object>
): Array<Article> => {
  return _.map(articles, (item): Object => {
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
      createdAt: toISOFormatting(item.post_date),
      updatedAt: toISOFormatting(item.post_modified),
      publishedAt: toISOFormatting(item.pubdate)
    };
  });
};
