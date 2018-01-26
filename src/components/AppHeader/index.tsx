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
            clientTypes,
            currentUser,
            filteredClients,
            isInteractive,
            message,
            searchResultsIsVisible,
            setInteractive,
            setSearchResultsVisibility,
            searchClients,
         } = this.props;

        return (
            <AppHeader
                clients={clients}    
                clientTypes={clientTypes}
                backgroundColor={theme.headingBackground1}    
                currentUser={currentUser}
                extractPanelIsShowing={searchResultsIsVisible}
                filteredClients={filteredClients}
                isInteractive={isInteractive}
                message={message}
                searchClients={searchClients}
                setInteractive={setInteractive}
                setPanelVisibility={setSearchResultsVisibility}
            />);
    }
}

export default connect(
    (state: ApplicationState) => state.clientSlice,
    actionCreators
)(ContainerTemplate);