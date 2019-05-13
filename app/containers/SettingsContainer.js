//@flow
import React from 'react';
import { connect } from 'react-redux';

import { Settings } from '../components';
import {
  setFrequncy,
  changeSettingsNeuralnet,
  changeSettingsMap
} from '../actions';

const mapStateToProps = (state: Object) => ({
  parserFrequncy: state.settings.parserFrequncy,
  settingsNeuralNet: state.settings.neuralNet,
  settingsMap: state.settings.map
});

export const SettingsContainer = connect(
  mapStateToProps,
  { setFrequncy, changeSettingsNeuralnet, changeSettingsMap }
)(Settings);

// export const SettingsContainer = () => {
//   return <div>HELLO</div>;
// };
