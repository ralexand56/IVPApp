import actionCreators from '../../actions/ClientActions';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    ApplicationState,
} from '../../store';
import {
    ClientState,
    theme
} from '../../datatypes';
import AppHeader from './AppHeader';

type Props = ClientState &
    typeof actionCreators;

class ContainerTemplate extends Component<Props, {}> {

    render() {
        const {
            clients,
            currentUser,
            message,
            searchResultsIsVisible,
            setSearchResultsVisibility,
            searchClients,
         } = this.props;

        return (
            <AppHeader
                clients={clients}    
                backgroundColor={theme.headingBackground1}    
                currentUser={currentUser}
                extractPanelIsShowing={searchResultsIsVisible}
                message={message}
                searchClients={searchClients}
                setPanelVisibility={setSearchResultsVisibility}
            />);
    }
}

export default connect(
    (state: ApplicationState) => state.clientSlice,
    actionCreators
)(ContainerTemplate);