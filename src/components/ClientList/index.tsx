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
      setCurrentClient,
    } = this.props;

    return (
      <ClientList
        clients={clients}
        clientTypes={clientTypes}
        currentClientId={currentClientId}
        filteredClients={filteredClients}
        setCurrentClient={setCurrentClient}
      />
    );
  }
}

export default connect(
  (state: ApplicationState) => state.clientSlice,
  actionCreators,
)(ContainerTemplate);
