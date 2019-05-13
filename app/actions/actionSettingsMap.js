//@flow
import { CHANGE_SETTINGS_MAP } from '../constants';

export const changeSettingsMap = (middle: number, high: number) => ({
  type: CHANGE_SETTINGS_MAP,
  payload: {
    middle,
    high
  }
});
