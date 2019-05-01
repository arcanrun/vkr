//@flow
import { SET_ACTIVE_ANALZYE } from '../constants';
export const activeAnalyze = (id: string) => ({
  type: SET_ACTIVE_ANALZYE,
  payload: {
    id
  }
});
