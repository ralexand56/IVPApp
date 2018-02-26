import React, { StatelessComponent } from 'react';
import styled from '../../styled-components';
import ThemeInterface from '../../theme';
import { Client, ClientType, State } from '../../datatypes';
import ContactInfo from '../ContactInfo';
import HorizontalPanel from '../HorizontalLayout';
import SlidingPanel from '../SlidingPanel';
import EditableField from '../EditableField';
import { Button, Icon, Input, Select, Switch, Popconfirm } from 'antd';
import actionCreators from '../../actions/ClientActions';
import Radio from '../Radio';
import ArtGroup from '../ArtGroup';
import Comments from '../Comments';
import SampleWork from '../SampleWork';
import HorizontalLayout from '../HorizontalLayout';

const Option = Select.Option;

interface Props {
  className?: string;
  isInEditMode: boolean;
  clientTypes: ClientType[];
  currentClient: Client;
  children?: React.ReactChild;
  addClient: typeof actionCreators.addClient;
  setClientEditMode: typeof actionCreators.setClientEditMode;
  setCurrentClient: typeof actionCreators.setCurrentClient;
  stateList: State[];
  theme?: ThemeInterface;
  updateClient: typeof actionCreators.updateClient;
}

const Salutations = { 1: 'Mr.', 2: 'Mrs.', 3: 'Ms.' };

const margin = '0.1em';

const Index: StatelessComponent<Props> = ({
  addClient,
  className,
  clientTypes,
  currentClient,
  isInEditMode,
  setClientEditMode,
  setCurrentClient,
  stateList,
  updateClient
}) => {
  return (
    <div
      id="parent"
      className={className}
      onClick={e => setCurrentClient(undefined)}
    >
      <div
        onClick={e => {
          e.stopPropagation();
        }}
      >
        {' '}
        <CenterPanel>
          <ActionHeader>
            <Button
              style={{ margin: 3 }}
              size="small"
              ghost={true}
              onClick={() => addClient()}
            >
              <span style={{ margin: 3 }}>
                <Icon type="plus" />
              </span>
            </Button>
            {!isInEditMode ? (
              <Button
                style={{ margin: 3 }}
                size="small"
                ghost={true}
                onClick={() => setClientEditMode(true)}
              >
                <span style={{ margin: 3 }}>
                  <Icon type="edit" />
                </span>
              </Button>
            ) : (
              <Button
                style={{ margin: 3 }}
                size="small"
                ghost={true}
                onClick={() => setClientEditMode(false)}
              >
                <span style={{ margin: 3 }}>Done</span>
              </Button>
            )}
            <Popconfirm
              placement="top"
              title="Are you sure you want to remove the client?"
              okText="Yes"
              cancelText="No"
              onConfirm={() =>
                updateClient({ ...currentClient, isActive: false })
              }
            >
              <Button
                size="small"
                ghost={true}
                style={{ margin: 5 }}
                type="primary"
              >
                <Icon type="delete" />
              </Button>
            </Popconfirm>
            <Button
              style={{ margin: 3 }}
              size="small"
              ghost={true}
              onClick={() => setCurrentClient(undefined)}
            >
              <Icon type="double-left" />Back to Client List
            </Button>
          </ActionHeader>
          <MainPanel>
            <Column1>
              <SlidingPanel margin={margin} title="info">
                <Info
                  clientTypes={clientTypes}
                  currentClient={currentClient}
                  isInEditMode={isInEditMode}
                  setClientEditMode={setClientEditMode}
                  updateClient={updateClient}
                />
              </SlidingPanel>
              <SlidingPanel margin={margin} title="Address">
                <Address
                  currentClient={currentClient}
                  isInEditMode={isInEditMode}
                  setClientEditMode={setClientEditMode}
                  stateList={stateList}
                  updateClient={updateClient}
                />
              </SlidingPanel>
              <ArtGroup />
              <ContactInfo />
              <Comments />
            </Column1>
            <Column2>
              <SlidingPanel margin={margin} title="Sample Work">
                <SampleWork />
              </SlidingPanel>
              <SlidingPanel margin={margin} title="Additional Tags" />
              <SlidingPanel margin={margin} title="List Subscription">
                <ListSubscriptionPanel>
                  <HorizontalPanel>
                    <Switch
                      checked={currentClient.emailList}
                      onChange={val =>
                        updateClient({ ...currentClient, emailList: val })
                      }
                    />
                    <span style={{ margin: 3 }}>Email</span>
                  </HorizontalPanel>
                  <HorizontalPanel>
                    <Switch
                      checked={currentClient.mailList}
                      onChange={val =>
                        updateClient({ ...currentClient, mailList: val })
                      }
                    />
                    <span style={{ margin: 3 }}>Mail</span>
                  </HorizontalPanel>
                </ListSubscriptionPanel>
              </SlidingPanel>
            </Column2>
          </MainPanel>
        </CenterPanel>
      </div>
    </div>
  );
};

const ListSubscriptionPanel = styled.div`
  color: ${props => props.theme.headingBackground2 || 'black'};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: 0.7em;
  text-transform: uppercase;
  padding: 0.4em;
`;

const Info = ({
  clientTypes,
  currentClient,
  isInEditMode,
  setClientEditMode,
  updateClient
}: {
  clientTypes: ClientType[];
  currentClient: Client;
  isInEditMode: boolean;
  setClientEditMode: typeof actionCreators.setClientEditMode;
  updateClient: typeof actionCreators.updateClient;
}) => (
  <InfoPanel>
    <div style={{ flex: 1 }}>
      {' '}
      <EditableField
        isInEditMode={isInEditMode}
        txtValue={
          currentClient.salutation ? Salutations[currentClient.salutation] : ''
        }
      >
        <Radio
          items={[
            { id: 1, name: 'Mr.' },
            { id: 2, name: 'Mrs.' },
            { id: 3, name: 'Ms.' }
          ]}
          onChange={(id: number) =>
            updateClient({
              ...currentClient,
              salutation: id
            })
          }
          value={currentClient.salutation || undefined}
        />
      </EditableField>
      <HorizontalLayout>
        <EditableField
          label="First"
          isInEditMode={isInEditMode}
          txtValue={currentClient.firstName}
        >
          <Input
            defaultValue={currentClient.firstName}
            size="small"
            onChange={e =>
              updateClient({
                ...currentClient,
                firstName: e.currentTarget.value
              })
            }
          />
        </EditableField>
        <EditableField
          label="Last"
          isInEditMode={isInEditMode}
          txtValue={currentClient.lastName}
        >
          <Input
            size="small"
            defaultValue={currentClient.lastName}
            onChange={e =>
              updateClient({
                ...currentClient,
                lastName: e.currentTarget.value
              })
            }
          />
        </EditableField>
      </HorizontalLayout>
      <HorizontalPanel>
        <EditableField
          isInEditMode={isInEditMode}
          label="Title"
          txtValue={currentClient.title}
          inline={true}
        >
          <Input
            size="small"
            defaultValue={currentClient.title}
            onChange={e =>
              updateClient({
                ...currentClient,
                title: e.currentTarget.value
              })
            }
          />
        </EditableField>
      </HorizontalPanel>
      <HorizontalPanel>
        <EditableField
          isInEditMode={isInEditMode}
          label="Company"
          inline={true}
          txtValue={currentClient.company}
        >
          <Input
            size="small"
            defaultValue={currentClient.company}
            onChange={e =>
              updateClient({
                ...currentClient,
                company: e.currentTarget.value
              })
            }
          />
        </EditableField>
      </HorizontalPanel>
    </div>
    <div style={{ flex: 1, height: '100%', border: '0px solid red' }}>
      <SlidingPanel
        title="Client Group"
        color="#64c1a1"
        border="1px solid #64c1a1"
      >
        <EditableField
          txtValue={
            clientTypes.find(x => x.id === currentClient.clientTypeId)!.name
          }
          isInEditMode={isInEditMode}
        >
          <>
            <Select
              style={{ width: 150 }}
              value={currentClient.clientTypeId}
              onChange={val =>
                updateClient({
                  ...currentClient,
                  clientTypeId: val.toString()
                })
              }
            >
              {clientTypes.map(x => <Option key={x.id}>{x.name}</Option>)}
            </Select>
          </>
        </EditableField>
      </SlidingPanel>
    </div>
  </InfoPanel>
);

const Address = ({
  currentClient,
  isInEditMode,
  setClientEditMode,
  stateList,
  updateClient
}: {
  currentClient: Client;
  isInEditMode: boolean;
  setClientEditMode: typeof actionCreators.setClientEditMode;
  stateList: State[];
  updateClient: typeof actionCreators.updateClient;
}) => (
  <AddressPanel>
    <HorizontalPanel>
      <EditableField
        label="Address 1"
        txtValue={currentClient.address1}
        click={() => setClientEditMode(true)}
        isInEditMode={isInEditMode}
        inline={true}
      >
        <Input
          size="small"
          onChange={e =>
            updateClient({
              ...currentClient,
              address1: e.currentTarget.value
            })
          }
          value={currentClient.address1}
        />
      </EditableField>
    </HorizontalPanel>
    <HorizontalPanel>
      <EditableField
        label="Address 2"
        click={() => setClientEditMode(true)}
        txtValue={currentClient.address2}
        isInEditMode={isInEditMode}
        inline={true}
      >
        <Input
          size="small"
          onChange={e =>
            updateClient({
              ...currentClient,
              address2: e.currentTarget.value
            })
          }
          value={currentClient.address2}
        />
      </EditableField>
    </HorizontalPanel>
    <HorizontalPanel>
      <EditableField
        label="City"
        txtValue={currentClient.city}
        isInEditMode={isInEditMode}
        click={() => setClientEditMode(true)}
        inline={true}
      >
        <Input
          size="small"
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
        <Select
          size="small"
          value={currentClient.state}
          style={{ width: 60 }}
          onChange={e =>
            updateClient({ ...currentClient, state: e.toString() })
          }
        >
          {stateList.map(x => <Option key={x.id}>{x.id}</Option>)}
        </Select>
      </EditableField>
    </HorizontalPanel>
    <HorizontalPanel>
      <EditableField
        label="Country"
        txtValue={currentClient.country || 'USA'}
        isInEditMode={isInEditMode}
        inline={true}
        click={() => setClientEditMode(true)}
      >
        <Input
          size="small"
          onChange={e =>
            updateClient({ ...currentClient, country: e.currentTarget.value })
          }
          value={currentClient.country}
        />
      </EditableField>
      <EditableField
        label="Zip"
        txtValue={currentClient.zip}
        isInEditMode={isInEditMode}
        inline={true}
        click={() => setClientEditMode(true)}
      >
        <Input
          size="small"
          onChange={e =>
            updateClient({ ...currentClient, zip: e.currentTarget.value })
          }
          value={currentClient.zip}
        />
      </EditableField>
    </HorizontalPanel>
  </AddressPanel>
);

const AddressPanel = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5;
`;

const InfoPanel = styled.div`
  display: flex;
  align-items: stretch;
  height: 100%;
  padding: 5;
  width: 100%;
  color: ${props => props.theme.headingBackground2 || 'black'};
  font-size: 0.9em;
`;

const CenterPanel = styled.div`
  display: flex;
  color: ${props => props.theme.headingBackground1 || 'black'};
  flex-direction: column;
  background: ${props => props.theme.bodyBackground || 'white'};
  font-size: 1em;
  padding: 0em;
  width: 1072px;
  height: 100%;
`;

const MainPanel = styled.div`
  display: flex;
  background: ${props => props.theme.bodyBackground || 'white'};
  font-size: 1em;
  padding: 0.2em;
`;

const Column1 = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const Column2 = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const ActionHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0.2em;
  background: ${props => props.theme.headingBackground2 || 'initial'};
`;

const StyledIndex = styled(Index)`
  background: rgba(134, 114, 144, 0.7);
  display: flex;
  font-size: 1.2em;
  justify-content: center;
  position: absolute;
  top: 0px;
  margin: 59px 0 0 0;
  width: 100%;
  height: 100%;
  @media (max-width: 700px) {
    display: none;
    font-size: 1em;
  }
`;

export default StyledIndex;
