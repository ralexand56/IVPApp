import actionCreators from './actions/ClientActions';
import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import {
    ApplicationState,
} from './store';
import {
    ClientState,
} from './datatypes';
import App from './App';

type Props = ClientState &
    typeof actionCreators;

class ContainerTemplate extends Component<Props, {}> {
    // async componentWillMount() {
    //     const url = `https://functions-alexanderr777.azurewebsites.net/`
    //         + `api/HttpTriggerCSharp1?code=wuypDwc2aJVJdlbUzGYEn6NlHQgnQmxHUBc3aTiCaPUlkvhXgtNMCQ==`;

    //     const headers = new Headers(
    //         { 'Content-Type': 'application/json' }
    //     );

    //     const request = new Request(url, {
    //         headers,
    //         method: 'POST',
    //         body: JSON.stringify({ 
    //             id: 1,
    //             firstName: 'Rico',
    //             lastName: 'Alexander',
    //          })
    //     });

    //     const resp = await fetch(request);

    //     const val = await resp.json();
    //     console.dir(val);
    // }

    render() {
        const {
            setClientTab
        } = this.props;

        return (
            <App
                addClient={this.props.addClient}
                clients={this.props.clients}
                currentClientId={this.props.currentClientId}
                isInEditMode={this.props.isInEditMode}
                selectedClientTabId={this.props.selectedClientTabId}
                setCurrentClient={this.props.setCurrentClient}
                setClientTab={setClientTab}
            />
        );
    }
}

export default connect(
    (state: ApplicationState) => state.clientSlice,
    actionCreators
)(ContainerTemplate);