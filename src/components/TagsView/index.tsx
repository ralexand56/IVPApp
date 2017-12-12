import actionCreators from '../../actions/ClientActions';
import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import { ClientState } from '../../datatypes';
import TagsView from './TagsView';

type Props = ClientState & typeof actionCreators;

class ContainerTemplate extends Component<Props, {}> {
  render() {
    const {
      clients,
      currentClientId,
      tagCategories,
      toggleClientTag,
    } = this.props;

    const currentClient =
      clients[clients.findIndex(x => x.id === currentClientId)];

    return (
      <TagsView
        currentClient={currentClient}
        tagIds={currentClient.tagIds}
        tagCategories={tagCategories}
        toggleClientTag={toggleClientTag}
      />
    );
  }
}

export default connect(
  (state: ApplicationState) => state.clientSlice,
  actionCreators,
)(ContainerTemplate);
