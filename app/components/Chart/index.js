//@flow
import React from 'react';
import { PieChart, Pie, Legend, Tooltip } from 'recharts';

import style from './PieChart.css';
const data01 = [{ name: 'Group A', value: 1 }];

type PROPS = {
  color: string,
  data: Object,
  activeCountry: string
};

type STATE = {};
export class Chart extends React.Component<PROPS, STATE> {
  render() {
    const { color } = this.props;
    return (
      <div className={style.container}>
        <PieChart width={300} height={200}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data01}
            cx={150}
            cy={100}
            innerRadius={20}
            fill={color}
            label
          />
          <Tooltip />
        </PieChart>
      </div>
    );
  }
}
