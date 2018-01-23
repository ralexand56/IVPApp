import actionCreators from '../../actions/ClientActions';
import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import { ClientState } from '../../datatypes';
import Comments from './Comments';

type Props = ClientState & typeof actionCreators;

class ContainerTemplate extends Component<Props, {}> {
  render() {
    const {
      addComment,
      clients,
      currentClientId,
      currentUser,
      deleteComment
    } = this.props;

    const currentClient =
      clients[clients.findIndex(x => x.id === currentClientId)];

    return (
      <Comments
        addComment={addComment}
        currentClient={currentClient}
        currentUser={currentUser}
        comments={currentClient.comments}
        deleteComment={deleteComment}
      />
    );
  }
}

export default connect(
  (state: ApplicationState) => state.clientSlice,
  actionCreators
)(ContainerTemplate);
