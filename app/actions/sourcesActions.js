/* eslint-disable import/prefer-default-export */
// @flow
import { ipcRenderer } from 'electron';

import {
  GET_SOURCES_FAILURE,
  GET_SOURCES_SUCCESS,
  GET_SOURCES_REQUEST
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

export const getSources = () => {
  return (dispatch: Function) => {
    dispatch(requestGetSources());
    ipcRenderer.send('request_all_sources');
  };
};
ipcRenderer.on('recive_all_sources', (e, msg) => {
  store.dispatch(successGetSources(msg));
});
ipcRenderer.on('recive_all_sources_error', (e, msg) =>
  store.dispatch(failureGetSources(msg))
);

export const removeSource = (id: string) => {
  return (dispatch: Function) => {
    dispatch({
      type: 'TRYING_DELETE'
    });
    ipcRenderer.send('remove_source', id);
  };
};
ipcRenderer.on('remove_source_response', (e, msg) => {
  console.log('%c on_remove_response: ', 'background: #bff88b', msg);
});

export const startParsing = () => {
  return (dispatch: Function) => {
    dispatch({
      type: 'START_PARSING'
    });
    ipcRenderer.send('start_parsing');
  };
};

ipcRenderer.on('ipc_main_info', (event, msg) => {
  msg[0]
    ? alert(msg[1])
    : console.log('%c ipc_main_info ', 'color: white, background:red', msg[1]);
});
