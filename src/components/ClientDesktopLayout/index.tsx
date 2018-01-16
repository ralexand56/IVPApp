import React, { StatelessComponent } from 'react';
import styled from '../../styled-components';
import ThemeInterface from '../../theme';
import { Client } from '../../datatypes';
import ContactInfo from '../ContactInfo';
import HorizontalPanel from '../HorizontalLayout';
import SlidingPanel from '../SlidingPanel';
import EditableField from '../EditableField';
import { Button, Icon, Input, Switch } from 'antd';
import actionCreators from '../../actions/ClientActions';
import Radio from '../Radio';
import { Carousel } from 'react-responsive-carousel';
import ArtGroup from '../ArtGroup';
import Comments from '../Comments';
// import Slider from 'react-slick';

interface Props {
  className?: string;
  isInEditMode: boolean;
  currentClient: Client;
  children?: React.ReactChild;
  addClient: typeof actionCreators.addClient;
  setClientEditMode: typeof actionCreators.setClientEditMode;
  setCurrentClient: typeof actionCreators.setCurrentClient;
  theme?: ThemeInterface;
  updateClient: typeof actionCreators.updateClient;
}

const Salutations = { 1: 'Mr.', 2: 'Mrs.', 3: 'Ms.' };

const margin = '0.1em';

const Index: StatelessComponent<Props> = ({
  addClient,
  className,
  currentClient,
  isInEditMode,
  setClientEditMode,
  setCurrentClient,
  updateClient
}) => {
  return (
    <div className={className}>
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
                  <Switch defaultChecked={true} />
                  <span style={{ margin: 3 }}>Email</span>
                </HorizontalPanel>
                <HorizontalPanel>
                  <Switch />
                  <span style={{ margin: 3 }}>Mail</span>
                </HorizontalPanel>
              </ListSubscriptionPanel>
            </SlidingPanel>
          </Column2>
        </MainPanel>
      </CenterPanel>
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
  currentClient,
  isInEditMode,
  setClientEditMode,
  updateClient
}: {
  currentClient: Client;
  isInEditMode: boolean;
  setClientEditMode: typeof actionCreators.setClientEditMode;
  updateClient: typeof actionCreators.updateClient;
}) => (
  <InfoPanel>
    <HorizontalPanel>
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
      <EditableField
        isInEditMode={isInEditMode}
        txtValue={currentClient.firstName}
      >
        <Input
          defaultValue={currentClient.firstName}
          onChange={e =>
            updateClient({
              ...currentClient,
              firstName: e.currentTarget.value
            })
          }
        />
      </EditableField>
      <EditableField
        isInEditMode={isInEditMode}
        txtValue={currentClient.lastName}
      >
        <Input
          defaultValue={currentClient.lastName}
          onChange={e =>
            updateClient({
              ...currentClient,
              lastName: e.currentTarget.value
            })
          }
        />
      </EditableField>
    </HorizontalPanel>{' '}
    <HorizontalPanel>
      <EditableField
        isInEditMode={isInEditMode}
        label="Title"
        txtValue={currentClient.title}
        inline={true}
      >
        <Input
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
  </InfoPanel>
);

const Address = ({
  currentClient,
  isInEditMode,
  setClientEditMode,
  updateClient
}: {
  currentClient: Client;
  isInEditMode: boolean;
  setClientEditMode: typeof actionCreators.setClientEditMode;
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
    </HorizontalPanel>
    <HorizontalPanel>
      <EditableField
        label="Country"
        txtValue={currentClient.country}
        isInEditMode={isInEditMode}
        inline={true}
        click={() => setClientEditMode(true)}
      >
        <Input
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
  flex-direction: column;
  padding: 5;
`;

const SampleWork = () => (
  <SampleWorkPanel>
    <Carousel showArrows={true} autoPlay={true} infiniteLoop={false}>
      <div>
        <img src="./images/samples.png" />
      </div>
      <div>
        <img src="https://s.blogcdn.com/www.dailyfinance.com/media/2013/05/artist-604cs052113.jpg" />
      </div>
      <div>
        <img src="./images/warhol.jpg" />
      </div>
    </Carousel>
  </SampleWorkPanel>
);

const SampleWorkPanel = styled.div`
  display: flex;
  justify-content: center;
  img {
    display: flex; 
    max-width: 290px;
    max-height: 270px;
    width: auto;
    height: auto;
  }
`;

const CenterPanel = styled.div`
  display: flex;
  color: ${props => props.theme.headingBackground1 || 'black'};
  flex-direction: column;
  background: ${props => props.theme.bodyBackground || 'white'};
  font-size: 1em;
  padding: 0em;
  width: 1072px;
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
  background: rgba(255, 255, 255, 0.7);
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
