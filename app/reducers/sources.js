/* eslint-disable import/prefer-default-export */
// @flow

import {
  GET_SOURCES_FAILURE,
  GET_SOURCES_SUCCESS,
  GET_SOURCES_REQUEST
} from '../constants';

const initialState = {
  error: false,
  error_message: undefined,
  isFetching: false,
  sources: [],
  search: [],
  searchIsActive: false
};

export function sources(state: Object = initialState, action: Object) {
  switch (action.type) {
    case GET_SOURCES_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: false,
        error_message: undefined
      };
    case GET_SOURCES_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true,
        error_message: action.payload.error_message
      };
    case GET_SOURCES_SUCCESS:
      return { ...state, sources: action.payload.sources.sources };

    case 'SEARCH_SOURCE':
      const sources = state.sources;
      const searchRes = [];
      const searchPhrase = action.payload.title.toLowerCase();

      sources.forEach(el => {
        if (el.title.toLowerCase().includes(searchPhrase)) {
          searchRes.push(el);
        }
      });
      return { ...state, search: searchRes };
    case 'TOGGLE_SEARCH':
      return { ...state, searchIsActive: !state.searchIsActive, search: [] };
    default:
      return state;
  }
}
