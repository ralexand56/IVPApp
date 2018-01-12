import actionCreators from '../../actions/ClientActions';
import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import { ClientState } from '../../datatypes';
import App from './App';

type Props = ClientState & typeof actionCreators;

class ContainerTemplate extends Component<Props, {}> {
  render() {
    const {
      clients,
      currentClientId,
      isInEditMode,
      isInteractive,
      setClientEditMode,
      setCurrentClient,
      setInteractive,
      updateClient,
    } = this.props;
    const currentClient = currentClientId
      ? clients.find(x => x.id === currentClientId)
      : undefined;

    return (
      <App
        currentClient={currentClient}
        isInEditMode={isInEditMode}
        isInteractive={isInteractive}
        setCurrentClient={setCurrentClient}
        setClientEditMode={setClientEditMode}
        setInteractive={setInteractive}
        updateClient={updateClient}
      />
    );
  }
}

export default connect(
  (state: ApplicationState) => state.clientSlice,
  actionCreators
)(ContainerTemplate);
