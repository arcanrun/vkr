/* eslint-disable import/prefer-default-export */
// @flow

import React from 'react';

import style from './Analyze.css';
import { Card } from '../Card';
import { Map } from '../Map';
import { Calendar } from '../index';
import { Chart } from '../Chart';
import { setDateRange } from '../../actions';

type PROPS = {
  activeCountry: Function,
  setDateRange: Function,
  activeAnalyzeId: string,
  sources: Array<any>,
  activeCountryName: ?string,
  dateRange: Object
};

const Analyze = ({
  activeAnalyzeId,
  sources,
  activeCountry,
  activeCountryName,
  setDateRange,
  dateRange
}: PROPS) => {
  let data = {};
  let rangedData = {};
  let title = 'ANALZYE';

  sources.forEach(el => {
    if (el.id === activeAnalyzeId) {
      data = el.analyze;

      // eslint-disable-next-line prefer-destructuring
      title = el.title;
    }
  });
  for (let key in data) {
    const firstDateMs = data[key].dateRange[0] || 0;
    const secondDateMs = data[key].dateRange[1] || 0;

    const reduxFirstDataMs = Date.parse(dateRange.from);
    const secondFirstDataMs = Date.parse(dateRange.to);

    if (firstDateMs >= reduxFirstDataMs && secondDateMs <= secondFirstDataMs) {
      rangedData[key] = data[key];
    }
  }

  console.log(
    '%c ANALZYE ',
    'background: pink; color: white',
    data,
    rangedData
  );
  return (
    <div className={style.analyze}>
      <div className={style.header}>
        <div className={style.title}>{title}</div>
        <div className={style.moreBtn}>
          <i className="fas fa-ellipsis-h" />
        </div>
      </div>
      <div className={style.body}>
        <div className={style.control}>
          <Card icon="map" title="Карта активности" margin="0 10px 0 0">
            <Map
              highlight={rangedData}
              setActiveCountry={activeCountry}
              dateRange={dateRange}
            />
          </Card>
          <Card
            icon="calendar"
            title="Диапазон поиска"
            margin="0 0 0 10px"
            width="385px"
          >
            <Calendar setDateRange={setDateRange} />
          </Card>
        </div>
        <div className={style.charts}>
          <Card
            margin="0 10px 0 0"
            flex="1 0 auto"
            icon="marine"
            title="Переброски ВМС"
            height="320px"
            width="288px"
          >
            <Chart
              color="#4ADBBD"
              analyzeData={rangedData}
              activeCountryName={activeCountryName}
              corps="marine"
            />
          </Card>
          <Card
            margin="0 10px 0 10px"
            flex="1 0 auto"
            icon="jet"
            title="Переброски ВВС"
            height="320px"
            width="288px"
          >
            <Chart
              color="#4ADBBD"
              analyzeData={rangedData}
              activeCountryName={activeCountryName}
              corps="airforce"
            />
          </Card>
          <Card
            margin="0 0 0 10px"
            flex="1 0 auto"
            icon="man"
            title="Переброси СВ"
            height="320px"
            width="288px"
          >
            <Chart
              color="#4ADBBD"
              analyzeData={rangedData}
              activeCountryName={activeCountryName}
              corps="infantry"
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export { Analyze };
