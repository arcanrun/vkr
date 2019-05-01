//@flow
import React from 'react';
import { connect } from 'react-redux';

import { Sources, NavBar } from '../components';

const mapStateToProps = (state: Object) => ({
  sources: state.sources
});

export const SourcesContainer = connect(
  mapStateToProps,
  null
)(Sources);
