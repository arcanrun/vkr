//@flow
import React from 'react';
import Chart from 'react-apexcharts';

import style from './Chart2.css';

type PROPS = {};
type STATE = {
  options: any,
  series: any
};

export class Chart2 extends React.Component<PROPS, STATE> {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          width: '10px',
          height: 4100,
          parentHeightOffset: 15
        },
        width: '10px',
        height: 4100,
        labels: ['Team', 'Team B', 'Team C', 'Team D', 'Team E'],
        legend: {
          show: false
        },
        theme: {
          mode: 'light',
          palette: 'palette10',
          monochrome: {
            enabled: true,
            color: '#255aee',
            shadeTo: 'light',
            shadeIntensity: 0.65
          }
        }
      },
      series: [44, 55, 13, 43, 22]
    };
  }

  render() {
    return (
      <div className="chart">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="pie"
          width="380"
        />
      </div>
    );
  }
}
