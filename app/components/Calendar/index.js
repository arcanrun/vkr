//@flow
import React from 'react';
import DayPicker from 'react-day-picker';

import style from './Calendar.css';

type PROPS = {};
type STATE = {};

export class Calendar extends React.Component<PROPS, STATE> {
  render() {
    return <DayPicker />;
  }
}
