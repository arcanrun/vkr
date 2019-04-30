//@flow
import React from 'react';
import { PieChart, Pie, Legend, Tooltip } from 'recharts';

import style from './PieChart.css';
const data01 = [{ name: 'Group A', value: 20 }, { name: 'Group B', value: 50 }];

type PROPS = {
  color: string
};
export const Chart = ({ color }: PROPS) => {
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
};
