import React, { StatelessComponent } from 'react';
import styled from 'styled-components';
import EditableField from '../EditableField';
import { Input, Select } from 'antd';
import { Client, ClientType } from '../../datatypes';
import actionCreators from '../../actions/ClientActions';

interface Props {
  className?: string;
  clientTypes: ClientType[];
  currentClient: Client;
  isInEditMode: boolean;
  updateClient: typeof actionCreators.updateClient;
}

const Header: StatelessComponent<Props> = ({
  className,
  clientTypes,
  currentClient,
  isInEditMode,
  updateClient,
}) => (
  <span className={className} style={{ display: 'flex' }}>
    <EditableField
      label="First Name"
      txtValue={currentClient.firstName}
      isInEditMode={isInEditMode}
      labelColor="white"
    >
      <Input
        key="1"
        onChange={e =>
          updateClient({ ...currentClient, firstName: e.currentTarget.value })
        }
        value={currentClient.firstName}
      />
    </EditableField>
    <EditableField
      label="Last Name"
      txtValue={currentClient.lastName}
      isInEditMode={isInEditMode}
      labelColor="white"
    >
      <Input
        key="2"
        onChange={e =>
          updateClient({ ...currentClient, lastName: e.currentTarget.value })
        }
        value={currentClient.lastName}
      />
    </EditableField>
    <EditableField
      label="Type"
      txtValue={
        clientTypes && currentClient.clientTypeId
          ? clientTypes[
              clientTypes.findIndex(x => x.id === currentClient.clientTypeId)
            ].name
          : ''
      }
      isInEditMode={isInEditMode}
      labelColor="white"
    >
      <Select
        style={{ width: 150 }}
        onChange={(value: string) =>
          updateClient({ ...currentClient, clientTypeId: value })
        }
        value={currentClient.clientTypeId}
      >
        {clientTypes.map(x => (
          <Select.Option key={x.id} value={x.id}>
            {x.name}
          </Select.Option>
        ))}
      </Select>
    </EditableField>
  </span>
);

const StyledHeader = styled(Header)``;

export default StyledHeader;
