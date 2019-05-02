//@flow
import { SET_DATE_RANGE } from '../constants';
export const setDateRange = (dateRange: Object) => ({
  type: SET_DATE_RANGE,
  payload: {
    from: dateRange.from,
    to: dateRange.to
  }
});
