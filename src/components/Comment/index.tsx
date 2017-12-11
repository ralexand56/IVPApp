import actionCreators from '../../actions/ClientActions';
import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import {
    ApplicationState,
} from '../../store';
import {
    ClientState,
    Comment,
} from '../../datatypes';
import CommentView from './Comment';

interface CommentProps {
    comment: Comment;
}
type Props = ClientState & CommentProps &
    typeof actionCreators;

class ContainerTemplate extends Component<Props, {}> {

    render() {
        const {
            clients,
            comment,
            currentClientId,
            deleteComment,
        } = this.props;

        return (
            <CommentView
                comment={comment}
                currentClient={clients[clients.findIndex(x => x.id === currentClientId)]}
                deleteComment={deleteComment}
            />
        );
    }
}

export default connect(
    (state: ApplicationState) => state.clientSlice,
    actionCreators
)(ContainerTemplate);