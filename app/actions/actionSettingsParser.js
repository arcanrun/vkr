//@flow

import { ipcRenderer } from 'electron';

export const setFrequncy = (num: number) => ({
  type: 'SET_PARSER_FREQUNCY',
  payload: {
    frequncey: +num
  }
});

const setIntervalId = (id: number) => ({
  type: 'SET_INTERVAL_ID',
  payload: {
    id
  }
});

const deleteIntervalId = () => ({
  type: 'DELETE_INTERVAL_ID'
});

export const startParsing = (frequncey: number) => {
  return (dispatch: Function) => {
    const id = setInterval(() => {
      ipcRenderer.send('start_parsing');
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
