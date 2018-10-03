// @flow
import suggestionDao from '../dao/suggestions';
import formatter from './formatters/suggestionSearchFormatter';
import _ from 'lodash';
import type { Suggestion } from './formatters/suggestionSearchFormatter/types';

export class SuggestionsService extends formatter {
  suggestions: Object;

  constructor(suggestions: Object) {
    super();
    this.suggestions = suggestions;
  }

  setLimitItems = (
    items: Array<Suggestion>,
    limit: number
  ): Array<Suggestion> => items.slice(0, limit);

  async getSuggestionsList(query: string, limit: number): Object {
    if (_.isEmpty(query)) {
      return {
        totalCount: 0,
      };
    }

    const suggestionSearch = await this.suggestions.searchQuery(query, limit);
    const suggestionItems = [
      ...this.formatLocationLevel(suggestionSearch),
      ...this.formatDeveloper(suggestionSearch),
      ...this.formatDevelopment(suggestionSearch),
      // ...this.formatSubUnit(suggestionSearch),
    ];
    const limitItems = this.setLimitItems(suggestionItems, limit);

    return {
      items: limitItems,
      totalCount: _.size(limitItems),
    };
  }
}

export default new SuggestionsService(suggestionDao);
