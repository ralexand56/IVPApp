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
import ClientBody from './ClientBody';

type Props = ClientState &
    typeof actionCreators;

class ContainerTemplate extends Component<Props, {}> {

    render() {
        const {
            clients,
            currentClientId,
            isInEditMode,
            setClientEditMode,
            updateClient,
        } = this.props;

        const currentClient = clients[clients.findIndex(x => x.id === currentClientId)];

        return (
            <ClientBody
                currentClient={currentClient}
                isInEditMode={isInEditMode}
                setClientEditMode={setClientEditMode}
                updateClient={updateClient}
            />);
    }
}

export default connect(
    (state: ApplicationState) => state.clientSlice,
    actionCreators
)(ContainerTemplate);