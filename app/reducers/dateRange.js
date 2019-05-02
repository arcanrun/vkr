//@flow

import { SET_DATE_RANGE } from '../constants';

type initialType = {
  from: ?string,
  to: ?string
};

const initialState = {
  from: undefined,
  to: undefined
};

export function dateRange(state: initialType = initialState, action: Object) {
  switch (action.type) {
    case SET_DATE_RANGE:
      return { ...state, from: action.payload.from, to: action.payload.to };

    default:
      return state;
  }
}
