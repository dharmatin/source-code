// @flow
import suggestionDao from '../dao/suggestions';
import formatter from './formatters/suggestionSearchFormatter';
import _ from 'lodash';

export class SuggestionsService extends formatter {
  suggestions: Object;

  constructor(suggestions: Object) {
    super();
    this.suggestions = suggestions;
  }

  setLimitItems = (items: Array, limit: number): Object =>
    items.slice(0, limit);

  async getSuggestionsList(query: string, limit: number): Object {
    const suggestionSearch = await this.suggestions.searchQuery(query, limit);

    const responseLocationLevel = this.formatLocationLevel(suggestionSearch);
    const responseDeveloper = this.formatDeveloper(suggestionSearch);
    const responseDevelopment = this.formatDevelopment(suggestionSearch);
    const responseSubUnit = this.formatSubUnit(suggestionSearch);

    const items = [
      ...responseLocationLevel,
      ...responseDeveloper,
      ...responseDevelopment,
      ...responseSubUnit,
    ];

    const limitItems = this.setLimitItems(items, limit);

    return {
      items: limitItems,
      totalCount: _.size(limitItems),
    };
  }
}

export default new SuggestionsService(suggestionDao);
