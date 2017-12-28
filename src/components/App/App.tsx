import React, { Component } from 'react';
// import firebase from 'firebase';
import './App.css';
import AppHeader from '../AppHeader';
// import SidePanel from './components/SidePanel';
// import MainBody from './components/MainBody';
import ClientList from '../ClientList';
import ClientInfo from '../ClientInfo';
import { Client } from '../../datatypes';
import actionCreators from '../../actions/ClientActions';

interface Props {
  currentClient: Client | undefined;
  setCurrentClient: typeof actionCreators.setCurrentClient;
  isInteractive: boolean;
}

export default class App extends Component<Props, {}> {
  render() {
    const { currentClient, isInteractive, setCurrentClient } = this.props;
    return (
      <>
        <AppHeader />
        <ClientList />
        {currentClient && (
          <ClientInfo
            currentClient={currentClient}
            showClient={!isInteractive}
            setCurrentClient={setCurrentClient}
          />
        )}
      </>
    );
  }
}
