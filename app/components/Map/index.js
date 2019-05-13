//@flow
import React from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from 'react-simple-maps';
import ReactTooltip from 'react-tooltip';
import { Motion, spring } from 'react-motion';

import map from '../../static/world-50m';
import style from './Map.css';
import { isFor } from '@babel/types';

type STATE = {
  zoom: number,
  selected: string
};

type PROPS = {
  setActiveCountry: Function,
  settingsMap: Object,
  highlight: Object
};
export class Map extends React.Component<PROPS, STATE> {
  state = {
    zoom: 1,
    selected: ''
  };
  componentDidMount() {
    setTimeout(() => {
      ReactTooltip.rebuild();
    }, 100);
  }

  handleZoomIn = () => {
    this.setState({
      zoom: this.state.zoom * 2
    });
  };
  handleZoomOut = () => {
    const { zoom } = this.state;
    if (zoom > 1) {
      this.setState({
        zoom: this.state.zoom / 2
      });
    }
  };

  handleClick = (geo: Object) => {
    const name = geo.properties.NAME;
    const abrev = geo.properties.ISO_A3.toLowerCase();
    const { selected } = this.state;
    if (name === selected) {
      this.setState({ selected: '' });
      this.props.setActiveCountry('');
    } else {
      this.setState({ selected: name }, () => {
        console.log(
          '%c MAP ',
          'background: aqua; color: #fff',
          this.state.selected,
          abrev
        );
        this.props.setActiveCountry(abrev);
      });
    }
  };
  highlightRule = (number: number) => {
    const { middle, high } = this.props.settingsMap;
    console.log('00000', middle, high, number);

    let color = '#4ADBBD';
    if (+number >= +middle && +number <= high) {
      color = '#FFB200';
    } else if (+number > high) {
      color = '#F7297C';
    }

    return color;
  };

  highlightCountry = () => {
    const { highlight } = this.props;
    let res = {};
    for (let key in highlight) {
      res[key] = this.highlightRule(highlight[key].number_of_mentions);
    }

    return res;
  };

  makeDateRangeLable = (abrev: string) => {
    const { highlight } = this.props;
    if (highlight[abrev]) {
      const { dateRange } = highlight[abrev];
      const first = new Date(dateRange[0]);
      if (dateRange.length === 2) {
        const second = new Date(dateRange[1]);
        return `${first.toLocaleDateString()} - ${second.toLocaleDateString()}`;
      }
      return `${first.toLocaleDateString()}`;
    }
    return '';
  };
  render() {
    const { highlight } = this.props;
    const highlightCountry = this.highlightCountry();
    return (
      <div className={style.map}>
        <div className={style.mapBtns}>
          <button onClick={this.handleZoomIn}>{'+'}</button>
          <button onClick={this.handleZoomOut}>{'-'}</button>
        </div>
        <Motion
          defaultStyle={{
            zoom: 1
          }}
          style={{
            zoom: spring(this.state.zoom, { stiffness: 210, damping: 20 })
          }}
        >
          {({ zoom }) => (
            <ComposableMap
              projection={'times'}
              projectionConfig={{
                scale: 160,
                xOffset: 0,
                yOffset: 0,
                rotation: [0, 0, 0],
                precision: 0.1
              }}
              style={{
                width: '100%',
                height: 'auto'
              }}
            >
              <ZoomableGroup zoom={zoom}>
                <Geographies geography={map} disableOptimization>
                  {(geographies, projection) =>
                    geographies.map((geography, i) => {
                      // console.log(geography.properties.ISO_A3.toLowerCase());
                      const abrev = geography.properties.ISO_A3.toLowerCase();
                      const isHighLited = abrev in highlightCountry;
                      const name = geography.properties.NAME;
                      const { selected } = this.state;
                      const isSelcted = name === selected ? true : false;
                      return (
                        <Geography
                          data-tip={`${name} <br> ${this.makeDateRangeLable(
                            abrev
                          )}`}
                          key={geography.properties.ISO_A3 + i}
                          cacheId={geography.properties.ISO_A3 + i}
                          geography={geography}
                          projection={projection}
                          onClick={this.handleClick}
                          style={{
                            default: {
                              fill: isSelcted
                                ? '#008dff'
                                : isHighLited
                                ? highlightCountry[abrev]
                                : '#ECEFF1',
                              stroke: '#607D8B',
                              strokeWidth: 0.75,
                              outline: 'none'
                            },
                            hover: {
                              fill: '#51a0faa1',
                              stroke: '#607D8B',
                              strokeWidth: 0.75,
                              outline: 'none'
                            },
                            pressed: {
                              fill: '#008dff',
                              stroke: '#607D8B',
                              strokeWidth: 0.75,
                              outline: 'none'
                            }
                          }}
                        />
                      );
                    })
                  }
                </Geographies>
              </ZoomableGroup>
            </ComposableMap>
          )}
        </Motion>
        <ReactTooltip multiline />
      </div>
    );
  }
}
