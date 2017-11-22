import actionCreators from '../actions/ClientActions';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    ApplicationState,
} from '../store';
import {
    ClientState,
} from '../datatypes';
import AppHeader from './AppHeader';
import { theme } from '../datatypes';

type Props = ClientState &
    typeof actionCreators;

class ContainerTemplate extends Component<Props, {}> {

    render() {
        const {
            searchResultsIsVisible,
            setSearchResultsVisibility
         } = this.props;

        return (
            <AppHeader
                backgroundColor={theme.headingBackground1}    
                extractPanelIsShowing={searchResultsIsVisible}
                setPanelVisibility={setSearchResultsVisibility}
            />);
    }
}

export default connect(
    (state: ApplicationState) => state.clientSlice,
    actionCreators
)(ContainerTemplate);