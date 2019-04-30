// @flow

import React from 'react';

import style from './Analyze.css';
import { Card } from '../Card';
import { Map2 } from '../Map2';
import { Map } from '../Map';
import { Calendar } from '../index';
import { Chart } from '../Chart';
import { Chart2 } from '../Chart2';

const Analyze = () => {
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
          <Card icon="map" title="Карта активности" margin="0 10px 0 0">
            <Map />
          </Card>
          <Card icon="calendar" title="Диапазон поиска">
            <Calendar />
          </Card>
        </div>
        <div className={style.charts}>
          <Card
            margin="0 10px 0 0"
            flex="1 0 auto"
            icon="marine"
            title="Переброски ВМС"
          >
            <Chart color="#4ADBBD" />
          </Card>
          <Card
            margin="0 10px 0 10px"
            flex="1 0 auto"
            icon="jet"
            title="Переброски ВВС"
          >
            <Chart color="#4ADBBD" />
          </Card>
          <Card
            margin="0 0 0 10px"
            flex="1 0 auto"
            icon="man"
            title="Переброси СВ"
          >
            <Chart color="#4ADBBD" />
          </Card>
        </div>
      </div>
    </div>
  );
};

export { Analyze };
