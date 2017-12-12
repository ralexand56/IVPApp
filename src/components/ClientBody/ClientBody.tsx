import React, { StatelessComponent } from 'react';
import styled from 'styled-components';
import EditableField from '../EditableField';
import {
    Client,
    ClientType,
    theme,
} from '../../datatypes';
import RevealPanel from '../RevealPanel';
import {
    Avatar,
    Button,
    Icon,
    Input,
    Select,
} from 'antd';
import HorizontalLayout from '../HorizontalLayout';
import actionCreators from '../../actions/ClientActions';

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
    header={Header(
      clientTypes,
      currentClient,
      isInEditMode || false,
      updateClient,
    )}
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
    <HorizontalLayout>
      <RevealPanel
        header="Address"
        width="400px"
        endColor={theme.bodyBackground}
        height="auto"
        isVisible={true}
      >
        <EditableField
          label="Address 1"
          txtValue={currentClient.address1}
          isInEditMode={isInEditMode}
          inline={true}
        >
          <Input
            onChange={e =>
              updateClient({
                ...currentClient,
                address1: e.currentTarget.value,
              })
            }
            value={currentClient.address1}
          />
        </EditableField>
        <EditableField
          label="Address 2"
          txtValue={currentClient.address2}
          isInEditMode={isInEditMode}
          inline={true}
        >
          <Input
            onChange={e =>
              updateClient({
                ...currentClient,
                address2: e.currentTarget.value,
              })
            }
            value={currentClient.address2}
          />
        </EditableField>
        <HorizontalLayout>
          <EditableField
            label="City"
            txtValue={currentClient.city}
            isInEditMode={isInEditMode}
            inline={true}
          >
            <Input
              onChange={e =>
                updateClient({ ...currentClient, city: e.currentTarget.value })
              }
              value={currentClient.city}
            />
          </EditableField>
          <EditableField
            label="State"
            txtValue={currentClient.state}
            isInEditMode={isInEditMode}
            inline={true}
          >
            <Input
              onChange={e =>
                updateClient({ ...currentClient, state: e.currentTarget.value })
              }
              value={currentClient.state}
            />
          </EditableField>
        </HorizontalLayout>
        <EditableField
          label="Country"
          txtValue={currentClient.country}
          isInEditMode={isInEditMode}
          inline={true}
        >
          <Input
            onChange={e =>
              updateClient({ ...currentClient, country: e.currentTarget.value })
            }
            value={currentClient.country}
          />
        </EditableField>
      </RevealPanel>
      <RevealPanel
        header="Contact Info"
        width="400px"
        endColor={theme.bodyBackground}
        height="auto"
        isVisible={true}
      >
        <EditableField
          label="Title"
          txtValue={currentClient.title}
          isInEditMode={isInEditMode}
          inline={true}
        >
          <Input
            onChange={e =>
              updateClient({ ...currentClient, title: e.currentTarget.value })
            }
            value={currentClient.title}
          />
        </EditableField>
        <EditableField
          label="Company"
          txtValue={currentClient.company}
          isInEditMode={isInEditMode}
          inline={true}
        >
          <Input
            onChange={e =>
              updateClient({ ...currentClient, company: e.currentTarget.value })
            }
            value={currentClient.company}
          />
        </EditableField>
        <EditableField
          label="Phone"
          txtValue={currentClient.phone}
          isInEditMode={isInEditMode}
          inline={true}
        >
          <Input
            onChange={e =>
              updateClient({
                ...currentClient,
                phone: formatPhone(e.currentTarget.value),
              })
            }
            value={currentClient.phone}
          />
        </EditableField>
        <EditableField
          label="Email"
          txtValue={currentClient.email}
          isInEditMode={isInEditMode}
          inline={true}
        >
          <Input
            onChange={e =>
              updateClient({ ...currentClient, email: e.currentTarget.value })
            }
            value={currentClient.email}
          />
        </EditableField>
        <EditableField
          label="Website"
          txtValue={currentClient.website}
          isInEditMode={isInEditMode}
          inline={true}
        >
          <Input
            onChange={e =>
              updateClient({ ...currentClient, website: e.currentTarget.value })
            }
            value={currentClient.website}
          />
        </EditableField>
      </RevealPanel>
    </HorizontalLayout>
  </RevealPanel>
);

const StyledClientBody = styled(ClientBody) `
    display: flex;
    width: 80%;
    height: 100%;
    border: 0px solid;
    margin: 20px;
`;

export default StyledClientBody;

const Header = (
    clientTypes: ClientType[],
    currentClient: Client,
    isInEditMode: boolean,
    updateClient: typeof actionCreators.updateClient) => (
    <span style={{ display: 'flex' }}>
        <EditableField
            label="First Name"
            txtValue={currentClient.firstName}
            isInEditMode={isInEditMode}
            labelColor="white"
        >
            <Input
                key="1"
                onChange={(e) => updateClient({ ...currentClient, firstName: e.currentTarget.value })}
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
                onChange={(e) => updateClient({ ...currentClient, lastName: e.currentTarget.value })}
                value={currentClient.lastName}
            />
        </EditableField>
        <EditableField
            label="Type"
            txtValue={
                    (clientTypes && currentClient.clientTypeId)
                        ? clientTypes[clientTypes.findIndex(x => x.id === currentClient.clientTypeId)].name
                        : ''}
            isInEditMode={isInEditMode}
            labelColor="white"
        >
            <Select
                style={{width: 150}}        
                onChange={(value: string) => updateClient({ ...currentClient, clientTypeId: value })}
                value={currentClient.clientTypeId}
            >
                    {
                        clientTypes.map(x => <Select.Option key={x.id} value={x.id}>{x.name}</Select.Option>)}
            </Select>        
        </EditableField>
    </span>
);

const formatPhone = (phonenum: string) => {
    var regexObj = /^(?:\+?1[-. ]?)?(?:\(?([0-9]{3})\)?[-. ]?)?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (regexObj.test(phonenum)) {
        let parts = phonenum.match(regexObj);
        let phone = '';
        if (parts && parts[1]) { phone += '+1 (' + parts[1] + ') '; }
        if (parts) { phone += parts[2] + '-' + parts[3]; }
        return phone;
    } else {
        // invalid phone number
        return phonenum;
    }
};