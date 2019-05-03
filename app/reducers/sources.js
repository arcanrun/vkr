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
  sources: []
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
    default:
      return state;
  }
}
