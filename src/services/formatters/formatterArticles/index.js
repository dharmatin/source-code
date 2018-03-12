// @flow
import _ from 'lodash';
import type { Article } from './types';

// export const formatterArticles = (
//   article: Object
// ): Array<Article> => {
//   if (article.numFound > 0) {
//     const articleList = [];

//   _.map(_.compact(article), item => {
//       console.log(item);
//     const [url, description] = _.split(item, ';');
//     image360s.push(url);
//   });

//   //return image360s;
//   } else {
//     return [];
//   }
// };

export const formatterArticles = (
  articleLists: Object
): Array<Article> => {
  const article = [];
  // console.log('Debug', Article);
  _.map(articleLists, item => {
    // const articleList = {};
    // articleList.id = item.id;
    console.log(item);
  });

  return articleLists;
};
