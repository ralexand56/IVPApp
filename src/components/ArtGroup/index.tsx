import actionCreators from '../../actions/ClientActions';
import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import { ClientState } from '../../datatypes';
import ArtGroup from './ArtGroup';

type Props = ClientState & typeof actionCreators;

class ContainerTemplate extends Component<Props, {}> {
  render() {
    const {
      addTag,
      clients,
      currentClientId,
      isInEditMode,
      majorTags,
      minorTags,
      setClientEditMode,
      updateClient,
    } = this.props;
    const currentClient = currentClientId
      ? clients.find(x => x.id === currentClientId)
      : undefined;

    return (
      currentClient && (
        <ArtGroup
          addTag={addTag}
          currentClient={currentClient}
          isInEditMode={isInEditMode}
          majorTags={majorTags}
          minorTags={minorTags}
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
