import actionCreators from '../../actions/ClientActions';
import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import {
    ApplicationState,
} from '../../store';
import {
    ClientState,
} from '../../datatypes';
import Comments from './Comments';

type Props = ClientState &
    typeof actionCreators;

class ContainerTemplate extends Component<Props, {}> {

    render() {
        const {
            clients,
            currentClientId,
        } = this.props;

        const currentClient = clients[clients.findIndex(x => x.id === currentClientId)];

        return (
            currentClient.comments &&
            (
                <Comments
                    comments={currentClient.comments}
                />
            )
        );
    }
}

export default connect(
    (state: ApplicationState) => state.clientSlice,
    actionCreators
)(ContainerTemplate);