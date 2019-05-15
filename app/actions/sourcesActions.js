/* eslint-disable import/prefer-default-export */
// @flow
import { ipcRenderer } from 'electron';

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
import { store } from '../index';

const requestGetSources = () => ({
  type: GET_SOURCES_REQUEST,
  payload: {
    error: false,
    isFetching: true
  }
});

const failureGetSources = (err: any) => ({
  type: GET_SOURCES_FAILURE,
  payload: {
    isFetching: false,
    error: true,
    error_message: err
  }
});

const successGetSources = data => ({
  type: GET_SOURCES_SUCCESS,
  payload: {
    sources: data,
    error: false,
    isFetching: false
  }
});

export const getSources = (showDemo: boolean) => {
  return (dispatch: Function) => {
    dispatch(requestGetSources());
    ipcRenderer.send('request_all_sources', showDemo);
  };
};
ipcRenderer.on('recive_all_sources', (e, msg) => {
  console.log('reciced--->', msg);
  store.dispatch(successGetSources(msg));
});
ipcRenderer.on('recive_all_sources_error', (e, msg) =>
  store.dispatch(failureGetSources(msg))
);

export const removeSource = (id: string) => {
  return (dispatch: Function) => {
    dispatch({
      type: TRYING_DELETE
    });
    ipcRenderer.send('remove_source', id);
  };
};
ipcRenderer.on('remove_source_response', (e, msg) => {
  console.log('%c on_remove_response: ', 'background: #bff88b', msg);
});

export const searchSource = (title: string) => ({
  type: SEARCH_SOURCE,
  payload: {
    title
  }
});

export const toggleSearch = () => ({
  type: TOGGLE_SEARCH
});

export const sortByDate = () => ({
  type: SORT_SOURCES_BY_DATE
});

export const sortByName = () => ({
  type: SORT_SOURCES_BY_NAME
});

export const showDemo = () => {
  return {
    type: SHOW_DEMO
  };
};
export const hideDemo = () => {
  return {
    type: HIDE_DEMO
  };
};

ipcRenderer.on('ipc_main_info', (event, msg) => {
  // eslint-disable-next-line no-unused-expressions
  msg[0]
    ? alert(msg[1])
    : console.log('%c ipc_main_info ', 'color: white, background:red', msg[1]);
});
