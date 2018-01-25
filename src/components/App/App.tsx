import React, { Component } from 'react';
import './App.css';
import AppHeader from '../AppHeader';
import ClientList from '../ClientList';
// import ClientInfo from '../ClientInfo';
import { Client, ClientType } from '../../datatypes';
import actionCreators from '../../actions/ClientActions';
import { Affix, Switch } from 'antd';
import ClientMobileLayout from '../ClientMobileLayout';
import ClientDesktopLayout from '../ClientDesktopLayout';

interface Props {
  addClient: typeof actionCreators.addClient;
  clientTypes: ClientType[];
  currentClient: Client | undefined;
  setCurrentClient: typeof actionCreators.setCurrentClient;
  setClientEditMode: typeof actionCreators.setClientEditMode;
  setInteractive: typeof actionCreators.setInteractive;
  isInEditMode: boolean;
  isInteractive: boolean;
  updateClient: typeof actionCreators.updateClient;
}

export default class App extends Component<Props, {}> {
  render() {
    const {
      addClient,
      clientTypes,
      currentClient,
      isInEditMode,
      isInteractive,
      setClientEditMode,
      setCurrentClient,
      setInteractive,
      updateClient,
    } = this.props;
    return (
      <div>
        <AppHeader />
        <ClientList />
        {currentClient && (
          <>
            <ClientDesktopLayout
              addClient={addClient}
              clientTypes={clientTypes}
              isInEditMode={isInEditMode}
              currentClient={currentClient}
              setClientEditMode={setClientEditMode}
              setCurrentClient={setCurrentClient}
              updateClient={updateClient}
            />
            <ClientMobileLayout currentClient={currentClient} />
          </>
          // <ClientInfo
          //   currentClient={currentClient}
          //   showClient={!isInteractive && currentClient !== undefined}
          //   setCurrentClient={setCurrentClient}
          // />
        )}
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
