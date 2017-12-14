import React, { StatelessComponent } from 'react';
import styled from 'styled-components';
import { Client, ClientType, theme } from '../../datatypes';
import RevealPanel from '../RevealPanel';
import { Avatar, Button, Icon } from 'antd';
import HorizontalLayout from '../HorizontalLayout';
import actionCreators from '../../actions/ClientActions';
import Header from './Header';
import Notes from './Notes';
import Address from './Address';
import ContactInfo from './ContactInfo';

interface Props {
  className?: string;
  children?: React.ReactChild;
  clientTypes: ClientType[];
  currentClient: Client;
  isInEditMode?: boolean;
  setClientEditMode: typeof actionCreators.setClientEditMode;
  updateClient: typeof actionCreators.updateClient;
}

const ClientBody: StatelessComponent<Props> = ({
  className,
  clientTypes,
  children,
  currentClient,
  isInEditMode,
  setClientEditMode,
  updateClient,
}) => (
  <RevealPanel
    className={className}
    endColor={theme.bodyBackground}
    header={
      <Header
        clientTypes={clientTypes}
        currentClient={currentClient}
        isInEditMode={isInEditMode || false}
        updateClient={updateClient}
      />
    }
    actions={
      <>
        <Button
          style={{ margin: 5 }}
          size="small"
          ghost={true}
          onClick={() =>
            updateClient({ ...currentClient, isActive: false }, true)
          }
        >
          <Icon type="delete" />
        </Button>
        <Button
          style={{ margin: 5 }}
          size="small"
          ghost={true}
          onClick={() => setClientEditMode(!isInEditMode)}
        >
          <Icon type="edit" />
        </Button>
        <Avatar
          src={currentClient.imgUrl ? `./images/${currentClient.imgUrl}` : ''}
          shape="square"
          size="large"
          icon="user"
          style={{ marginRight: 10 }}
        />
      </>
    }
  >
    <HorizontalLayout align="flex-start">
      <Address
        setClientEditMode={setClientEditMode}
        currentClient={currentClient}
        isInEditMode={isInEditMode || false}
        updateClient={updateClient}
      />
      <ContactInfo
        currentClient={currentClient}
        isInEditMode={isInEditMode || false}
        updateClient={updateClient}
      />
    </HorizontalLayout>
    <Notes
      currentClient={currentClient}
      isInEditMode={isInEditMode || false}
      updateClient={updateClient}
    />
  </RevealPanel>
);

const StyledClientBody = styled(ClientBody)`
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 0px solid;
  margin: 0px;
`;

export default StyledClientBody;
