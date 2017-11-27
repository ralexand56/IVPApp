import actionCreators from '../../actions/ClientActions';
import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import {
    ApplicationState,
} from '../../store';
import {
    ClientState,
    theme,
} from '../../datatypes';
import SidePanel from './index';
import { Table } from 'antd';
import { Client } from '../../datatypes';

type Props = ClientState &
    typeof actionCreators;

class SidePanelContainer extends Component<Props, {}> {

    render() {
        const {
            filteredClients
        } = this.props;
        return (
            <SidePanel
                isOpen={this.props.searchResultsIsVisible}
                toggle={this.props.setSearchResultsVisibility}
                endColor={theme.bodyBackground}
            >
                <Table
                    dataSource={filteredClients}
                    columns={Columns}
                    rowKey="id"
                    rowClassName={(rec: Client, ind: number) => ind % 2 ? 'alternateColor' : 'transparent'}
                />
            </SidePanel>);
    }
}

export default connect(
    (state: ApplicationState) => state.clientSlice,
    actionCreators
)(SidePanelContainer);

const Columns = [{
    title: 'First Name',
    dataIndex: 'firstName',
    key: 'firstName',
},
{
    title: 'Last Name',
    dataIndex: 'lastName',
    key: 'lastName',
}];