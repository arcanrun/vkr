//@flow
import React from 'react';
import { connect } from 'react-redux';

import { Settings } from '../components/Settings';
import { setFrequncy } from '../actions';

const mapStateToProps = (state: Object) => ({
  parserFrequncy: state.settings.parserFrequncy
});

export const SettingsContainer = connect(
  mapStateToProps,
  { setFrequncy }
)(Settings);
