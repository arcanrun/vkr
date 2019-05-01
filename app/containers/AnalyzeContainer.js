//@flow
import React from 'react';
import { connect } from 'react-redux';

import { Analyze } from '../components';
import { activeCountry } from '../actions';

const mapSateToProps = (state: Object) => ({
  id_activeAnalyze: state.activeAnazlye.id,
  sources: state.sources
});

export const AnalyzeContainer = connect(
  mapSateToProps,
  { activeCountry }
)(Analyze);
