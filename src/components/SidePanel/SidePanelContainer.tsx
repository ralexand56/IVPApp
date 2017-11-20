import actionCreators from '../../actions/ClientActions';
import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import {
    ApplicationState,
} from '../../store';
import {
    ClientState,
} from '../../datatypes';
import SidePanel from './index';

type Props = ClientState &
    typeof actionCreators;

class SidePanelContainer extends Component<Props, {}> {

    render() {

        return (
            <SidePanel
                isOpen={this.props.searchResultsIsVisible}
                toggle={this.props.setSearchResultsVisibility}
            >
                Rico
            </SidePanel>);
    }
}

export default connect(
    (state: ApplicationState) => state.clientSlice,
    actionCreators
)(SidePanelContainer);