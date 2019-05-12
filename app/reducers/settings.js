/* eslint-disable import/prefer-default-export */
// @flow

const initialState = {
  parserFrequncy: 5
};

export function settings(state: Object = initialState, action: Object) {
  switch (action.type) {
    case 'SET_PARSER_FREQUNCY':
      return { ...state, parserFrequncy: action.payload.frequncey };
    default:
      return state;
  }
}
