import actionCreators from '../../actions/ClientActions';
import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import { ClientState } from '../../datatypes';
import ClientFooter from './ClientFooter';
import ErrorBoundary from '../ErrorBoundary';

type Props = ClientState & typeof actionCreators;

class ContainerTemplate extends Component<Props, {}> {
  render() {
    const {
      clients,
      currentClientId,
      selectedClientTabId,
      setClientTab,
    } = this.props;

    const currentClient =
      clients[clients.findIndex(x => x.id === currentClientId)];

    return (
      <ErrorBoundary>
        <ClientFooter
          currentClient={currentClient}
          selectedClientTabId={selectedClientTabId}
          setClientTab={setClientTab}
        />
      </ErrorBoundary>
    );
  }
}

export default connect(
  (state: ApplicationState) => state.clientSlice,
  actionCreators,
)(ContainerTemplate);
