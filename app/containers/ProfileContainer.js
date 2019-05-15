import React from 'react';
import { connect } from 'react-redux';

import { Profile } from '../components';
import { showDemo, hideDemo } from '../actions';

export const ProfileContainer = connect(
  null,
  { showDemo, hideDemo }
)(Profile);
