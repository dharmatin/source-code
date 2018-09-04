import _ from 'lodash';
import constants from '../config/constants';

export const replaceSpaceWithAsterisk = (text: string): string =>
  _.replace(text, constants.COMMON.BLANK_SPACE, constants.COMMON.ASTERISK);
