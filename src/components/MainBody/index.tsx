import actionCreators from '../../actions/ClientActions';
import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import { ClientState } from '../../datatypes';
import MainBody from './MainBody';

type Props = ClientState & typeof actionCreators;

class ContainerTemplate extends Component<Props, {}> {
  
  render() {
    const {
      addClient,
      clients,
      currentClientId,
      searchResultsIsVisible,
      setCurrentClient,
    } = this.props;
    
    const currentClientIndex = clients.findIndex(x => x.id === currentClientId);

    return (
      <MainBody
        addClient={addClient}
        clients={clients}
        currentClient={clients[currentClientIndex]}
        currentClientIndex={currentClientIndex}
        searchResultsIsVisible={searchResultsIsVisible}
        setCurrentClient={setCurrentClient}
      />
    );
  }
}

export default connect(
  (state: ApplicationState) => state.clientSlice,
  actionCreators,
)(ContainerTemplate);
