// @flow
import type { MultiLanguagePlace } from '../addressFormatter/types';

export type Suggestion = {
  id: string,
  type: string,
  title: string,
  subtitle?: string,
  label: string,
  multilanguagePlace: MultiLanguagePlace,
};
