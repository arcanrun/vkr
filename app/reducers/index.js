// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { sources } from './sources';

export default function createRootReducer(history: History) {
  return combineReducers<{}, *>({
    router: connectRouter(history),
    sources: sources
  });
}
