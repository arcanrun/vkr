/* eslint-disable import/prefer-default-export */
// @flow

// eslint-disable-next-line no-unused-vars
import React from 'react';
import { connect } from 'react-redux';

import { Sources } from '../components';
import { activeAnalyze, getSources, removeSource } from '../actions';

const mapStateToProps = (state: Object) => ({
  sources: state.sources.sources,
  activeAnalyzeID: state.activeAnazlye.id,
  parserFrequncy: state.settings.parserFrequncy
});

export const SourcesContainer = connect(
  mapStateToProps,
  { activeAnalyze, getSources, removeSource }
)(Sources);
