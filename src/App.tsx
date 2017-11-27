import React, { Component } from 'react';
// import {
//   Card
// } from 'antd';
import './App.css';
import styled from 'styled-components';
import AppHeaderContainer from './components/AppHeaderContainer';
// import Button from './components/Button';
import ClientBody from './components/ClientBody';
import SidePanelContainer from './components/SidePanel/SidePanelContainer';
import RevealPanel from './components/RevealPanel';
import {
  Client,
  theme,
} from './datatypes';
import {
  Icon,
} from 'antd';
import actionCreators from './actions/ClientActions';
// import Radio from './components/Radio';
// import Comments from './components/Comments';
// import Interactions from './components/Interactions';
import Btn from '@atlaskit/button';
// const ClientViews = {
//   1: <Comments comments={[]} />,
//   2: <Interactions />,
// };

const MainContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  border: 1px solid;
  padding: 50px;
`;

interface Props {
  addClient: typeof actionCreators.addClient;
  clients: Client[];
  currentClientId: number | undefined;
  isInEditMode: boolean;
  selectedClientTabId: number;
  setClientTab: typeof actionCreators.setClientTab;
  setCurrentClient: typeof actionCreators.setCurrentClient;
}

// const Button = styled.button`
//   background: transparent;
//   border: none;
// `;

// const StyledCard = styled(Card) `
//   color: orange;
//   margin: 50px;
//   width: 300px;
//   background: #ECECEC;
// `;

export default class App extends Component<Props, {}> {
  handleChange = () => {
    let i = 0;

    console.dir(i);
  }

  render() {
    const {
      addClient,
      clients,
      currentClientId,
      setCurrentClient,
    } = this.props;

    const currentClientIndex = clients.findIndex(x => x.id === currentClientId);
    const currentClient = clients.filter(x => x.id === currentClientId)[0];
    const fullName = currentClientId
      ? `Current Client: ${currentClient.firstName} ${currentClient.lastName}`
      : 'None selected...';
    return (
      [<AppHeaderContainer key="header" />,
      (
        <SidePanelContainer key="sidepanel" />
      ),
      (
        <MainContainer key="main">
          <RevealPanel
            endColor={theme.bodyBackground}
            actions={
              [
                <span
                  key="totalClients"
                  style={{ color: 'white' }}
                >
                  Total Clients: {clients.length}
                </span>,
                <Btn
                  key="addBtn"
                  onClick={() => addClient(findMaxId(clients) + 1)}
                >
                  <Icon type="plus" />
                </Btn>,
                <Btn
                  key="previousBtn"
                  isDisabled={currentClientIndex === 0}
                  onClick={() => setCurrentClient(clients[currentClientIndex - 1].id)}
                >
                  <Icon type="left" />
                </Btn>,
                <Btn
                  key="nextBtn"
                  isDisabled={currentClientIndex === clients.length - 1}
                  onClick={() => setCurrentClient(clients[currentClientIndex + 1].id)}
                >
                  <Icon type="right" />
                </Btn>,
              ]
            }
            header={
              <span>
                <Icon
                  type="user"
                  style={{ margin: 5 }}
                />
                {fullName}
              </span>}
            isVisible={true}
          >
            <div>
              <ClientBody />
              {/* <RevealPanel>
                header={
                  newFunction(selectedClientTabId, setClientTab)
                }
                {
                  ClientViews[selectedClientTabId]
                }
              </RevealPanel> */}
            </div>
          </RevealPanel>
        </MainContainer>
      )
      ]
    );
  }
}

const findMaxId = (clients: Client[]) => {
  let max = 0;

  clients.map(x => x.id >= max ? max = x.id : null);
  return max;
};

// const renderClientTab(selectedClientTabId: number, setClientTab: (selectedClientTabId: number) 
// => { type: string; clientTabId: number; }) => (
//   <Radio items={[
//     { name: 'Comments', id: 1 },
//     { name: 'Interactions', id: 2 },
//     { name: 'Sample Assets', id: 3 },
//   ]} selectedPropsId={selectedClientTabId} 
// onChange={(id: number) => setClientTab(id)} underlineColor={theme.headingBackground2} />);
