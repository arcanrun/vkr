/* eslint-disable import/prefer-default-export */
// @flow
import React from 'react';
import { PieChart, Pie, Tooltip } from 'recharts';

import style from './PieChart.css';

// const data01 = [{ name: 'Group A', value: 1 }, { name: 'Group b', value: 2 }];

type PROPS = {
  color: string,
  analyzeData: ?Object,
  activeCountryName: ?string,
  corps: ?string
};

type STATE = {
  // analyzeData: ?Object,
  // activeCountryName: ?string,
  // formatedData: ?Array<any>
};
class Chart extends React.Component<PROPS, STATE> {
  // state = {
  //   analyzeData: undefined,
  //   activeCountryName: undefined,
  //   formatedData: undefined
  // };

  // componentDidMount() {
  //   const { analyzeData, activeCountryName } = this.props;
  //   this.fromatData(analyzeData);
  //   this.setState({ analyzeData, activeCountryName });
  // }

  // componentDidUpdate(prevProps: Object, pervState: Object) {
  //   const { analyzeData, activeCountryName } = this.props;
  //   if (analyzeData !== prevProps.analyzeData) {
  //     this.fromatData(analyzeData);
  //     this.setState({ analyzeData });
  //   }
  //   if (activeCountryName !== prevProps.activeCountryName) {
  //     this.setState({ activeCountryName });
  //   }
  // }

  // fromatData = (data: Object) => {
  //   const formatedData = [];
  //   const temp = {};

  //   for (const key in data) {
  //     temp.name = key;
  //     temp.value = data.key;
  //     formatedData.push(temp);
  //   }
  //   this.setState({ formatedData });
  // };

  render() {
    const { color, corps, activeCountryName, analyzeData } = this.props;
    // const { formatedData } = this.state;
    let displayData = '';
    if (analyzeData[activeCountryName]) {
      displayData = analyzeData[activeCountryName][corps];
    }

    console.log(
      `%c CHARTS-${corps} `,
      'background: green; color: white',
      displayData
    );

    return (
      <div className={style.container}>
        <PieChart width={300} height={200}>
          <Pie
            dataKey="value"
            isAnimationActive
            data={displayData}
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

export { Chart };
