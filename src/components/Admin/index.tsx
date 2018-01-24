import actionCreators from '../../actions/ClientActions';
import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import { ClientState } from '../../datatypes';
import Admin from './Admin';
import ErrorBoundary from '../ErrorBoundary';

type Props = ClientState & typeof actionCreators;

class ContainerTemplate extends Component<Props, {}> {
  render() {
    const {
      addClientType,
      addTagToCategory,
      clientTypes,
      importClients,
      tagCategories,
    } = this.props;

    return (
      <ErrorBoundary>
        <Admin
          addClientType={addClientType}  
          addTagToCategory={addTagToCategory}
          clientTypes={clientTypes}
          importClients={importClients}
          tagCategories={tagCategories}
        />
      </ErrorBoundary>
    );
  }
}

export default connect(
  (state: ApplicationState) => state.clientSlice,
  actionCreators,
)(ContainerTemplate);
