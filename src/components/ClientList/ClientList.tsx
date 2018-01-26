import React, { StatelessComponent } from 'react';
import styled from '../../styled-components';
import { Client, ClientType } from '../../datatypes';
import ThemeInterface from '../../theme';
import { ColumnProps } from 'antd/lib/table';
import { Avatar, Table, Tag } from 'antd';
import actionCreators from '../../actions/ClientActions';

interface Props {
  className?: string;
  clients: Client[];
  clientTypes: ClientType[];
  currentClientId: string | undefined;
  filteredClients: Client[];
  setCurrentClient: typeof actionCreators.setCurrentClient;
  theme?: ThemeInterface;
}

const ClientList: StatelessComponent<Props> = props => {
  const { currentClientId, filteredClients, setCurrentClient } = props;

  const Columns: ColumnProps<Client>[] = [
    {
      dataIndex: 'sampleLinks',
      key: 'sampleLinks',
      render: (i: string, c: Client) => (
        <Avatar
          src={
            c.sampleLinks && c.sampleLinks.length > 0
              ? `${c.sampleLinks[0].src}`
              : ''
          }
          shape="square"
          icon="user"
        />
      ),
    },
    {
      title: 'Name',
      render: (i: string, c: Client) => (
        <span>
          {c.firstName} {c.lastName}
        </span>
      ),
    },
    {
      title: 'Group',
      dataIndex: 'clientTypeId',
      key: 'clientTypeId',
      render: (i: string, c: Client) => (
        <span>
          {c.clientTypeId
            ? props.clientTypes[
                props.clientTypes.findIndex(x => x.id === c.clientTypeId)
              ].name
            : ''}
        </span>
      ),
    },
    {
      title: 'Art Type',
      dataIndex: 'majorTags',
      key: 'majorTags',
      render: (i: string, c: Client) =>
        c.majorTags &&
        c.majorTags.slice(0, 2).map(x => (
          <Tag key={x.id} style={{ margin: 3 }} color="blue">
            {x.name}
          </Tag>
        )),
    },
    {
      title: 'Tags',
      dataIndex: 'minorTags',
      key: 'minorTags',
      render: (i: string, c: Client) =>
        c.minorTags &&
        c.minorTags.slice(0, 2).map(x => (
          <Tag key={x.id} style={{ margin: 3 }} color="magenta">
            {x.name}
          </Tag>
        )),
    },
    {
      title: 'Affiliations',
      dataIndex: 'affiliations',
      key: 'affiliations',
      render: (i: string, c: Client) =>
        c.affiliations &&
        c.affiliations.slice(0, 2).map(x => (
          <Tag key={x.id} style={{ margin: 3 }} color="blue">
            {x.name}
          </Tag>
        )),
    },
    {
      title: 'Location',
      render: (i: string, c: Client) => (
        <span>
          {c.state}
          {c.state && c.country ? ', ' : ''} {c.country}
        </span>
      ),
    },
  ];

  return (
    <div className={props.className}>
      <Table
        dataSource={filteredClients}
        columns={Columns}
        onRow={(c: Client) => ({ onClick: () => setCurrentClient(c.id) })}
        rowKey="id"
        rowClassName={(rec: Client, ind: number) =>
          rec.id === currentClientId
            ? 'selectedColor'
            : ind % 2 ? 'oddColor' : 'evenColor'
        }
      />
    </div>
  );
};

const StyledClientList = styled(ClientList)`
  background: ${props => props.theme.bodyBackground || 'white'};
  display: block;
  height: 100%;
  padding-top: 60px;
  overflow-y: auto;
`;

export default StyledClientList;
