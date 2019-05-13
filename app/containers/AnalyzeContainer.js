/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
// @flow

import React from 'react';
import { connect } from 'react-redux';

import { Analyze } from '../components';
import { activeCountry, setDateRange } from '../actions';

const mapStateToProps = (state: Object) => ({
  activeAnalyzeId: state.activeAnazlye.id,
  sources: state.sources.sources,
  activeCountryName: state.activeCountry.name,
  dateRange: state.dateRange,
  settingsMap: state.settings.map
});

export const AnalyzeContainer = connect(
  mapStateToProps,
  { activeCountry, setDateRange }
)(Analyze);
