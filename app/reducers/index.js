// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { resources } from './resources';

export default function createRootReducer(history: History) {
  return combineReducers<{}, *>({
    router: connectRouter(history),
    resources: resources
  });
}
