//@flow
type initialType = {
  name: ?string
};

const initialState = {
  name: undefined
};

export function activeCountry(
  state: initialType = initialState,
  action: Object
) {
  switch (action.type) {
    case 'SET_ACTIVE_COUNTRY':
      return { ...state, name: action.payload.name };
    default:
      return state;
  }
}
