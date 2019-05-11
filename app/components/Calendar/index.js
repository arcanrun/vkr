//@flow
import React from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';

import style from './Calendar.css';

const locale = 'ru';
const WEEKDAYS_SHORT = {
  ru: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
};
const MONTHS = {
  ru: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
  ]
};

const WEEKDAYS_LONG = {
  ru: [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота'
  ]
};

const FIRST_DAY_OF_WEEK = {
  ru: 1
};
// Translate aria-labels
const LABELS = {
  ru: { nextMonth: 'следующий месяц', previousMonth: 'предыдущий месяц' }
};

type PROPS = {
  setDateRange: Function
};
type STATE = { from: ?string, to: ?string };

export class Calendar extends React.Component<PROPS, STATE> {
  state = {
    from: undefined,
    to: undefined
  };
  handleDayClick = (day: any) => {
    const NineHours = 32400000;
    let formatedDay = new Date(Date.parse(day) - NineHours);
    let range = DateUtils.addDayToRange(formatedDay, this.state);
    // if (!range.from) {
    //   range.from = new Date(Date.parse(range.from) - NineHours);
    // }
    // if (range.to) {
    //   range.to = new Date(Date.parse(range.to) - NineHours);
    // }
    console.log('%c CALENDAR ', 'background: yellow', range);

    this.props.setDateRange(range);
    this.setState(range);
  };
  handleResetClick = () => {
    const range = {
      from: undefined,
      to: undefined
    };
    this.props.setDateRange(range);
    this.setState({ from: undefined, to: undefined });
  };
  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    return (
      <div className={style.calendar}>
        <DayPicker
          locale={locale}
          months={MONTHS[locale]}
          weekdaysLong={WEEKDAYS_LONG[locale]}
          weekdaysShort={WEEKDAYS_SHORT[locale]}
          firstDayOfWeek={FIRST_DAY_OF_WEEK[locale]}
          labels={LABELS[locale]}
          className="Selectable"
          selectedDays={[from, { from, to }]}
          modifiers={modifiers}
          onDayClick={this.handleDayClick}
        />
        <div className={style.control}>
          <button className={style.btn} onClick={this.handleResetClick}>
            сбросить
          </button>
        </div>
      </div>
    );
  }
}
