// @flow

import React from 'react';
import { VectorMap } from 'react-jvectormap';

import style from './Map2.css';

type PROPS = {};
type STATE = { selected: string };

class Map2 extends React.Component<PROPS, STATE> {
  constructor(props) {
    super(props);
    this.state = {
      selected: ''
    };
    this.map = '';
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e: any, code: string) {
    const regionName = this.refs.map.$mapObject.getRegionName(code);
    this.map = regionName;
    console.log('===', this.map);
  }

  render() {
    return (
      <VectorMap
        ref={'map'}
        regionsSelectable
        regionsSelectableOne
        map="world_mill"
        backgroundColor="transparent"
        containerClassName="map"
        containerStyle={{
          maxWidth: '100%',
          height: '300px'
        }}
        regionStyle={{
          initial: {
            fill: '#b4b0b0c9',
            stroke: 'none',
            'stroke-width': 2
          },
          selected: {
            fill: 'red'
          }
        }}
        onRegionClick={this.handleClick}
      />
    );
  }
}

export { Map2 };
