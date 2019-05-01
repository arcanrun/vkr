//@flow
// import { SET_ACTIVE_ANALZYE } from '../constants';
export const activeCountry = (name: string) => ({
  type: 'SET_ACTIVE_COUNTRY',
  payload: {
    name
  }
});
