/* eslint-disable import/prefer-default-export */
// @flow

import {
  SET_ACTIVE_ANALZYE,
  SET_ACTIVE_COUNTRY,
  SET_DATE_RANGE,
  GET_SOURCES_FAILURE,
  GET_SOURCES_REQUEST,
  GET_SOURCES_SUCCESS,
  TRYING_DELETE,
  SEARCH_SOURCE,
  TOGGLE_SEARCH,
  SORT_SOURCES_BY_DATE,
  SORT_SOURCES_BY_NAME,
  SHOW_DEMO,
  HIDE_DEMO
} from '../constants';

const initialState = {
  error: false,
  error_message: undefined,
  isFetching: false,
  sources: [],
  search: [],
  searchIsActive: false,
  sortByDate: false,
  sortByName: false,
  is_show_demo: false
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
      if (state.sortByName) {
        const analyze = action.payload.sources.sources.slice(0, 1);
        const sortedByName = action.payload.sources.sources.slice(1);
        sortedByName.sort((a, b) => {
          const first = a.title.toLowerCase();
          const second = b.title.toLowerCase();
          if (first > second) return 1;
          if (second < first) return -1;
        });
        return { ...state, sources: [...analyze, ...sortedByName] };
      }
      if (state.sortByDate) {
        const analyze = action.payload.sources.sources.slice(0, 1);
        const sortedByDate = action.payload.sources.sources.slice(1);
        sortedByDate.sort((a, b) => {
          const first = a.trackingDate;
          const second = b.trackingDate;
          if (first > second) return 1;
          if (second < first) return -1;
        });
        return { ...state, sources: [...analyze, ...sortedByDate] };
      }
      return { ...state, sources: action.payload.sources.sources };

    case SEARCH_SOURCE:
      const sources = state.sources;
      const searchRes = [];
      const searchPhrase = action.payload.title.toLowerCase();

      sources.forEach(el => {
        if (el.title.toLowerCase().includes(searchPhrase)) {
          searchRes.push(el);
        }
      });
      return { ...state, search: searchRes };
    case TOGGLE_SEARCH:
      return { ...state, searchIsActive: !state.searchIsActive, search: [] };

    case SORT_SOURCES_BY_DATE: {
      const analyze = state.sources.slice(0, 1);
      const sortedByDate = state.sources.slice(1);
      sortedByDate.sort((a, b) => {
        const first = a.trackingDate;
        const second = b.trackingDate;
        if (first > second) return 1;
        if (second < first) return -1;
      });

      return {
        ...state,
        sortByDate: true,
        sortByName: false,
        sources: [...analyze, ...sortedByDate]
      };
    }
    case SORT_SOURCES_BY_NAME: {
      const analyze = state.sources.slice(0, 1);
      const sortedByName = state.sources.slice(1);
      sortedByName.sort((a, b) => {
        const first = a.title.toLowerCase();
        const second = b.title.toLowerCase();
        if (first > second) return 1;
        if (second < first) return -1;
      });

      return {
        ...state,
        sortByDate: false,
        sortByName: true,
        sources: [...analyze, ...sortedByName]
      };
    }
    case SHOW_DEMO:
      return { ...state, is_show_demo: true };
    case HIDE_DEMO:
      return { ...state, is_show_demo: false };
    default:
      return state;
  }
}
