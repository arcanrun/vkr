/* eslint-disable import/prefer-default-export */
// @flow

// eslint-disable-next-line no-unused-vars
import React from 'react';
import { connect } from 'react-redux';

import { Sources } from '../components';
import {
  activeAnalyze,
  getSources,
  removeSource,
  startParsing,
  stopParsing,
  searchSource,
  toggleSearch,
  sortByDate,
  sortByName
} from '../actions';

const mapStateToProps = (state: Object) => ({
  sources: state.sources.sources,
  search: state.sources.search,
  searchIsActive: state.sources.searchIsActive,
  activeAnalyzeID: state.activeAnazlye.id,
  parserFrequncy: state.settings.parserFrequncy,
  intervalId: state.settings.intervalId,
  isSortByDate: state.sources.sortByDate,
  isSortByName: state.sources.sortByName,
  settingsNeuralNet: state.settings.neuralNet
});

export const SourcesContainer = connect(
  mapStateToProps,
  {
    activeAnalyze,
    getSources,
    removeSource,
    startParsing,
    stopParsing,
    searchSource,
    toggleSearch,
    sortByDate,
    sortByName
  }
)(Sources);
