/* eslint-disable import/prefer-default-export */
// @flow
import React from 'react';
import { PieChart, Pie, Tooltip } from 'recharts';
import { CSSTransition } from 'react-transition-group';

import style from './PieChart.css';
import { abrevToName } from './tools';

type PROPS = {
  color: string,
  analyzeData: ?Object,
  activeCountryName: ?string,
  corps: ?string
};

type STATE = {};
class Chart extends React.Component<PROPS, STATE> {
  render() {
    const { color, corps, activeCountryName, analyzeData } = this.props;
    let displayData = '';
    const normalizeData = [];

    if (analyzeData[activeCountryName]) {
      displayData = analyzeData[activeCountryName][corps];
      displayData.forEach(el => {
        const normName = abrevToName[el.name];
        normalizeData.push({
          name: normName ? normName : el.name,
          value: el.value
        });
      });
    }

    let showMock = true;
    let showChart = false;

    if (displayData && displayData.length !== 0) {
      showChart = true;
      showMock = false;
    }

    console.log(
      `%c CHARTS-${corps} `,
      'background: green; color: white',
      normalizeData
    );
    const mock = (
      <CSSTransition
        in={showMock}
        timeout={300}
        classNames="alert"
        unmountOnExit
        mountOnEnter
      >
        <div className={style.mock}>
          <i className="fas fa-chart-pie" />
        </div>
      </CSSTransition>
    );
    const chart = normalizeData ? (
      <PieChart width={300} height={200}>
        <Pie
          dataKey="value"
          isAnimationActive
          data={normalizeData}
          cx={150}
          cy={100}
          innerRadius={20}
          fill={color}
          label
        />
        <Tooltip />
      </PieChart>
    ) : null;
    return (
      <div className={style.container}>
        {chart}
        {mock}
      </div>
    );
  }
}

export { Chart };
