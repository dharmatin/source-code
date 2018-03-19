// @flow
import _ from 'lodash';
import Serialization from 'php-serialization';
import type { Article } from './types';
import {
  getUrlSharpie,
  toISOFormatting,
  slugify,
} from '../../../libs/utility';
import config from '../../../config';
import { stringify } from 'querystring';

export const formatAttributesArticle = (
  articles: Object,
  pagingRequest: Object
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
          url: config.image.baseUrl + '/' + unserializeImage.key,
          urlTemplate: getUrlSharpie(unserializeImage.key, true),
        },
      },
      title: item.title,
      snippet: getFirstParagraph(item.content),
      createdAt: toISOFormatting(item.post_date),
      updatedAt: toISOFormatting(item.post_modified),
      publishedAt: toISOFormatting(item.pubdate),
    };
  });

  const totalNumber = articles.response.numFound;
  const nextPageToken = ((pagingRequest.pageToken * pagingRequest.pageSize >= totalNumber) ? pagingRequest.pageToken : pagingRequest.pageToken + 1).toString();
  const result = {};

  if (articleList.length > 0) {
    result.title = 'news';
    result.kind = 'article#list';
    result.articles = articleList;
    if (nextPageToken > pagingRequest.pageToken) {
      result.nextPageToken = nextPageToken;
    }
    result.totalCount = totalNumber;
  } else {
    result.totalCount = 0;
  }

  return result;
};

export const getFirstParagraph = (html: string): string => {
  const result = splitHtmlByParagraph(html);
  return !_.isNil(result[0]) ? result[0].replace(/<[^>]+>/ig, '') : '';
};

export const splitHtmlByParagraph = (html: string): any => {
  const paragraph = html.match(/<\s*?p\b[^>]*>(.+)<\/p\b[^>]*>/g);
  return paragraph;
};
