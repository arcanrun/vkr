//@flow
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
