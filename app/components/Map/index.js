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

type STATE = {
  zoom: number,
  selected: string
};

export class Map extends React.Component<{}, STATE> {
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
    this.setState({
      zoom: this.state.zoom / 2
    });
  };

  handleClick = (geo: Object) => {
    const name = geo.properties.NAME;
    const { selected } = this.state;
    name === selected
      ? this.setState({ selected: '' })
      : this.setState({ selected: name }, () =>
          console.log(this.state.selected)
        );
  };

  render() {
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
                yOffset: 50,
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
                      const name = geography.properties.NAME;
                      const { selected } = this.state;
                      const isSelcted = name === selected ? true : false;

                      return (
                        <Geography
                          data-tip={name}
                          key={i}
                          geography={geography}
                          projection={projection}
                          onClick={this.handleClick}
                          style={{
                            default: {
                              fill: isSelcted ? '#008dff' : '#ECEFF1',
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
                              fill: '#FF5722',
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
        <ReactTooltip />
      </div>
    );
  }
}
