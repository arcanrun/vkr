//@flow
import React from 'react';
import { connect } from 'react-redux';

import { Sources, NavBar } from '../components';
import { activeAnalyze } from '../actions';

const mapStateToProps = (state: Object) => ({
  sources: state.sources,
  id_activeAnalyze: state.activeAnazlye.id
});

export const SourcesContainer = connect(
  mapStateToProps,
  { activeAnalyze }
)(Sources);
