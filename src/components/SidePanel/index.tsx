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
import SidePanel from './SidePanel';
import {
    Avatar,
    Table,
} from 'antd';
import { Client } from '../../datatypes';

type Props = ClientState &
    typeof actionCreators;

class Container extends Component<Props, {}> {

    render() {
        const {
            clients
        } = this.props;
        return (
            <SidePanel
                isOpen={this.props.searchResultsIsVisible}
                toggle={this.props.setSearchResultsVisibility}
                endColor={theme.bodyBackground}
            >
                <Table
                    dataSource={clients}
                    columns={Columns}
                    rowKey="id"
                    style={{ minWidth: 300 }}
                    rowClassName={(rec: Client, ind: number) => ind % 2 ? 'alternateColor' : 'transparent'}
                />
            </SidePanel>);
    }
}

export default connect(
    (state: ApplicationState) => state.clientSlice,
    actionCreators
)(Container);

const Columns = [
    {
        dataIndex: 'imgUrl',
        key: 'imgUrl',
        render: (i: string, c: Client) => (
            <Avatar
                src={c.imgUrl ? `/images/${c.imgUrl}` : ''}
                shape="square"
                icon="user"
            />
        ),
    },
    {
        title: 'First Name',
        dataIndex: 'firstName',
        key: 'firstName',
    },
    {
        title: 'Last Name',
        dataIndex: 'lastName',
        key: 'lastName',
    },
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'Company',
        dataIndex: 'company',
        key: 'company',
    }];