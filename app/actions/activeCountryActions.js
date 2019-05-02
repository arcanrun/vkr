/* eslint-disable import/prefer-default-export */
// @flow

import { SET_ACTIVE_COUNTRY } from '../constants';
export const activeCountry = (name: string) => ({
  type: SET_ACTIVE_COUNTRY,
  payload: {
    name
  }
});
