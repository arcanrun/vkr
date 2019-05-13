//@flow

import { ipcRenderer } from 'electron';

import {
  SET_PARSER_FREQUNCY,
  SET_INTERVAL_ID,
  DELETE_INTERVAL_ID
} from '../constants';

export const setFrequncy = (num: number) => ({
  type: SET_PARSER_FREQUNCY,
  payload: {
    frequncey: +num
  }
});

const setIntervalId = (id: number) => ({
  type: SET_INTERVAL_ID,
  payload: {
    id
  }
});

const deleteIntervalId = () => ({
  type: DELETE_INTERVAL_ID
});

export const startParsing = (frequncey: number, sensitivity: Object) => {
  return (dispatch: Function) => {
    const id = setInterval(() => {
      ipcRenderer.send('start_parsing', sensitivity);
    }, frequncey);
    dispatch(setIntervalId(+id));
  };
};

export const stopParsing = (id: number) => {
  return (dispatch: Function) => {
    clearInterval(id);
    dispatch(deleteIntervalId(+id));
  };
};
