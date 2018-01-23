import actionCreators from '../../actions/ClientActions';
import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import { ClientState } from '../../datatypes';
import SampleWork from './SampleWork';

type Props = ClientState & typeof actionCreators;

class ContainerTemplate extends Component<Props, {}> {
  render() {
    const {
      addSampleWork,
      clients,
      currentClientId,
      deleteSampleLink,
      isInEditMode,
      setClientEditMode,
      updateClient,
    } = this.props;
    const currentClient = currentClientId
      ? clients.find(x => x.id === currentClientId)
      : undefined;

    return (
      currentClient && (
        <SampleWork
          addSampleWork={addSampleWork}
          currentClient={currentClient}
          deleteSampleLink={deleteSampleLink}
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
