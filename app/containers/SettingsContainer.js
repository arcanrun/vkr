//@flow
import React from 'react';
import { connect } from 'react-redux';

import { Settings } from '../components';
import { setFrequncy, changeSettingsNeuralnet } from '../actions';

const mapStateToProps = (state: Object) => ({
  parserFrequncy: state.settings.parserFrequncy,
  settingsNeuralNet: state.settings.neuralNet
});

export const SettingsContainer = connect(
  mapStateToProps,
  { setFrequncy, changeSettingsNeuralnet }
)(Settings);

// export const SettingsContainer = () => {
//   return <div>HELLO</div>;
// };
