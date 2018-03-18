// @flow
export type Article = {
  title: string,
  kind: string,
  articles: Array<Object>,
  nextPageToken: string,
  totalCount: number,
};
