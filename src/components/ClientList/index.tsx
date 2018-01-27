import actionCreators from '../../actions/ClientActions';
import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import { ClientState } from '../../datatypes';
import ClientList from './ClientList';

type Props = ClientState & typeof actionCreators;

class ContainerTemplate extends Component<Props, {}> {
  render() {
    const {
      clients,
      clientTypes,
      currentClientId,
      filteredClients,
      isInteractive,
      setCurrentClient,
      setInteractive,
    } = this.props;

    return (
      <ClientList
        clients={clients}
        clientTypes={clientTypes}
        currentClientId={currentClientId}
        isInteractive={isInteractive}
        filteredClients={filteredClients}
        setCurrentClient={setCurrentClient}
        setInteractive={setInteractive}
      />
    );
  }
}

export default connect(
  (state: ApplicationState) => state.clientSlice,
  actionCreators,
)(ContainerTemplate);
