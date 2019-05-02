/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
// @flow

import React from 'react';
import { connect } from 'react-redux';

import { Analyze } from '../components';
import { activeCountry, setDateRange } from '../actions';

const mapSateToProps = (state: Object) => ({
  activeAnalyzeId: state.activeAnazlye.id,
  sources: state.sources,
  activeCountryName: state.activeCountry.name
});

export const AnalyzeContainer = connect(
  mapSateToProps,
  { activeCountry, setDateRange }
)(Analyze);
