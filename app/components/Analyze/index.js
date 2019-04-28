//@flow
import React from 'react';

import style from './Analyze.css';
import { Card, Map } from '../index';

export const Analyze = () => {
  return (
    <div className={style.analyze}>
      <div className={style.header}>
        <div className={style.title}>Analyze Header</div>
        <div className={style.moreBtn}>
          <i className="fas fa-ellipsis-h" />
        </div>
      </div>
      <div className={style.body}>
        <div className={style.control}>
          <Card icon={'map'} title={'Карта активности'} width="500px">
            <Map />
          </Card>
          <Card icon={'calendar'} title={'Диапазон поиска'} width="250px">
            calendar
          </Card>
        </div>
      </div>
    </div>
  );
};
