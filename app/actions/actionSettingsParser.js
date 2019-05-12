import { dispatch } from 'rxjs/internal/observable/pairs';

//@flow

export const setFrequncy = (num: number) => ({
  type: 'SET_PARSER_FREQUNCY',
  payload: {
    frequncey: +num
  }
});

// export const setFrequncy = (num: number) => (
//   return dispatch:Function=>{
//     return
//   }
// );
