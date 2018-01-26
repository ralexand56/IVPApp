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
      addClient,
      clients,
      clientTypes,
      currentClientId,
      isInEditMode,
      isInteractive,
      setClientEditMode,
      setCurrentClient,
      setInteractive,
      stateList,
      updateClient,
    } = this.props;
    const currentClient = currentClientId
      ? clients.find(x => x.id === currentClientId)
      : undefined;

    return (
      <App
        addClient={addClient}
        clientTypes={clientTypes}
        currentClient={currentClient}
        isInEditMode={isInEditMode}
        isInteractive={isInteractive}
        setCurrentClient={setCurrentClient}
        setClientEditMode={setClientEditMode}
        setInteractive={setInteractive}
        stateList={stateList}
        updateClient={updateClient}
      />
    );
  }
}

export default connect(
  (state: ApplicationState) => state.clientSlice,
  actionCreators
)(ContainerTemplate);
