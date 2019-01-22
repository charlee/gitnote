import * as React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import SettingsPage from './containers/SettingsPage';
import routes from './constants/routes';

export default () => (
  <App>
    <Switch>
      <Route path={routes.SETTINGS} component={SettingsPage} />
      <Route path="/counter" component={CounterPage} />
      <Route path="/" component={HomePage} />
    </Switch>
  </App>
);
