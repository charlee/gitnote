import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import Settings from '../components/Settings';

class SettingsPage extends React.Component<RouteComponentProps<any>, void> {
  render() {
    return <Settings />;
  }
}

export default (SettingsPage as any as React.StatelessComponent<RouteComponentProps<any>>);