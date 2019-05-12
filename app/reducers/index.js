// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { sources } from './sources';
import { activeAnazlye } from './activeAnalyze';
import { activeCountry } from './activeCountry';
import { dateRange } from './dateRange';
import { settings } from './settings';

export default function createRootReducer(history: History) {
  return combineReducers<{}, *>({
    router: connectRouter(history),
    sources,
    activeAnazlye,
    activeCountry,
    dateRange,
    settings
  });
}
