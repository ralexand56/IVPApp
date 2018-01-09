import React, { Component } from 'react';
import './App.css';
import AppHeader from '../AppHeader';
import ClientList from '../ClientList';
import ClientInfo from '../ClientInfo';
import { Client } from '../../datatypes';
import actionCreators from '../../actions/ClientActions';
import { Affix, Switch } from 'antd';

interface Props {
  currentClient: Client | undefined;
  setCurrentClient: typeof actionCreators.setCurrentClient;
  setInteractive: typeof actionCreators.setInteractive;
  isInteractive: boolean;
}

export default class App extends Component<Props, {}> {
  render() {
    const {
      currentClient,
      isInteractive,
      setCurrentClient,
      setInteractive,
    } = this.props;
    return (
      <div>
        <AppHeader />
        <ClientList />
        <ClientInfo
          currentClient={currentClient}
          showClient={!isInteractive && currentClient !== undefined}
          setCurrentClient={setCurrentClient}
        />
        {InteractiveSwitch(isInteractive, setInteractive)}
      </div>
    );
  }
}

const InteractiveSwitch = (
  isInteractive: boolean,
  setInteractive: typeof actionCreators.setInteractive,
) => (
  <Affix offsetBottom={0} style={{ position: 'absolute', right: 0 }}>
    <Switch
      onChange={e => setInteractive(e)}
      checked={isInteractive}
      checkedChildren="Interactive"
      unCheckedChildren="Non-Interactive"
    />
  </Affix>
);
