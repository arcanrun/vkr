//@flow
import { SET_ACTIVE_ANALZYE } from '../constants';
type initialType = {
  id: ?string,
  title?: string,
  url?: string,
  icon?: string,
  descr?: string,
  tracking_date?: string,
  analyze?: {
    usa: {
      number_of_mentions: number,
      airforce: Object,
      marine: Object,
      infantry: Object
    }
  }
};

const initialState = {
  id: undefined
};

export function activeAnazlye(
  state: initialType = initialState,
  action: Object
) {
  switch (action.type) {
    case SET_ACTIVE_ANALZYE:
      return { ...state, id: action.payload.id };
    default:
      return state;
  }
}
