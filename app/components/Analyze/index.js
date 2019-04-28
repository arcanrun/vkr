//@flow
import React from 'react';

import style from './Analyze.css';
import { Card, Map, Calendar } from '../index';

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
          <Card icon={'map'} title={'Карта активности'} margin={'0 10px 0 0'}>
            <Map />
          </Card>
          <Card icon={'calendar'} title={'Диапазон поиска'}>
            <Calendar />
          </Card>
        </div>
      </div>
    </div>
  );
};
