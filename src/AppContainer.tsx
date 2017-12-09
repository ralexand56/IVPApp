import actionCreators from './actions/ClientActions';
import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from './store';
import { ClientState } from './datatypes';
import App from './App';

type Props = ClientState & typeof actionCreators;

class ContainerTemplate extends Component<Props, {}> {
  render() {
    return <App />;
  }
}

export default connect(
  (state: ApplicationState) => state.clientSlice,
  actionCreators,
)(ContainerTemplate);
