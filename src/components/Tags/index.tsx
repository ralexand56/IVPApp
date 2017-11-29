import actionCreators from '../../actions/ClientActions';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    ApplicationState,
} from '../../store';
import {
    ClientState,
} from '../../datatypes';

type Props = ClientState &
    typeof actionCreators;

class ContainerTemplate extends Component<Props, {}> {

    render() {

        return (
            <div>
                Template
            </div>);
    }
}

export default connect(
    (state: ApplicationState) => state.clientSlice,
    actionCreators
)(ContainerTemplate);