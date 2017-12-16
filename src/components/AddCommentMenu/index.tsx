import actionCreators from '../../actions/ClientActions';
import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import { ClientState } from '../../datatypes';
import AddCommentMenu from './AddCommentMenu';
import ErrorBoundary from '../ErrorBoundary';

type Props = ClientState & typeof actionCreators;

class ContainerTemplate extends Component<Props, {}> {
  render() {
    const currentClient = this.props.clients[
      this.props.clients.findIndex(x => x.id === this.props.currentClientId)
    ];

    return (
      <ErrorBoundary>
        <AddCommentMenu {...this.props} currentClient={currentClient} />
      </ErrorBoundary>
    );
  }
}

export default connect(
  (state: ApplicationState) => state.clientSlice,
  actionCreators,
)(ContainerTemplate);
