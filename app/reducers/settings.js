/* eslint-disable import/prefer-default-export */
// @flow

const initialState = {
  parserFrequncy: 5,
  intervalId: undefined,
  neuralNet: {
    sensWho: 0.3,
    sensWhere: 0.3,
    sensAirforce: 0.3,
    sensMarine: 0.3,
    sensInfantry: 0.3
  }
};

export function settings(state: Object = initialState, action: Object) {
  switch (action.type) {
    case 'SET_PARSER_FREQUNCY':
      return { ...state, parserFrequncy: action.payload.frequncey };
    case 'SET_INTERVAL_ID':
      return { ...state, intervalId: action.payload.id };
    case 'DELETE_INTERVAL_ID':
      return { ...state, intervalId: undefined };
    case 'CHANGE_SETTINGS_NEURAL_NET':
      return {
        ...state,
        neuralNet: {
          ...state.neuralNet,
          sensWho: action.payload.sensWho,
          sensWhere: action.payload.sensWhere,
          sensAirforce: action.payload.sensAirforce,
          sensMarine: action.payload.sensMarine,
          sensInfantry: action.payload.sensInfantry
        }
      };
    default:
      return state;
  }
}
