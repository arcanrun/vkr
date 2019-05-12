/* eslint-disable import/prefer-default-export */
// @flow

const initialState = {
  parserFrequncy: 5,
  intervalId: undefined
};

export function settings(state: Object = initialState, action: Object) {
  switch (action.type) {
    case 'SET_PARSER_FREQUNCY':
      return { ...state, parserFrequncy: action.payload.frequncey };
    case 'SET_INTERVAL_ID':
      return { ...state, intervalId: action.payload.id };
    case 'DELETE_INTERVAL_ID':
      return { ...state, intervalId: undefined };
    default:
      return state;
  }
}
