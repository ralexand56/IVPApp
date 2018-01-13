import actionCreators from '../../actions/ClientActions';
import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import { ClientState } from '../../datatypes';
import ContactInfo from './ContactInfo';

type Props = ClientState & typeof actionCreators;

class ContainerTemplate extends Component<Props, {}> {
  render() {
    const {
      clients,
      currentClientId,
      isInEditMode,
      setClientEditMode,
      updateClient,
    } = this.props;
    const currentClient = currentClientId
      ? clients.find(x => x.id === currentClientId)
      : undefined;

    return (
      currentClient && (
        <ContactInfo
          currentClient={currentClient}
          isInEditMode={isInEditMode}
          setClientEditMode={setClientEditMode}
          updateClient={updateClient}
        />
      )
    );
  }
}

export default connect(
  (state: ApplicationState) => state.clientSlice,
  actionCreators,
)(ContainerTemplate);
