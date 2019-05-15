import React from 'react';
import { Switch, Route } from 'react-router';

import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import { SettingsContainer, ProfileContainer } from './containers';
import { NavBar, SystemBar } from './components';

const styleMainAndNav = {
  display: 'flex',
  flexFlow: 'row',
  height: '100%',
  position: 'absolute',
  width: '100%'
};

const stlyeMainContainer = {
  width: '100%',
  height: '100%'
};

export default () => (
  <App>
    <SystemBar />
    <div style={styleMainAndNav}>
      <NavBar />
      <div style={stlyeMainContainer}>
        <Switch>
          <Route exact path={routes.HOME} component={HomePage} />
          <Route path={routes.SETTINGS} component={SettingsContainer} />
          <Route path={routes.PROFILE} component={ProfileContainer} />
        </Switch>
      </div>
    </div>
  </App>
);
