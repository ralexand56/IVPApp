import React, { Component } from 'react';
// import {
//   Card
// } from 'antd';
import './App.css';
import styled from 'styled-components';
import AppHeaderContainer from './components/AppHeaderContainer';
// import Button from './components/Button';
import ClientBody from './components/ClientBody';
import ClientFooter from './components/ClientFooter';
import SidePanelContainer from './components/SidePanel/SidePanelContainer';
import RevealPanel from './components/RevealPanel';
import {
  Client,
  theme,
} from './datatypes';
import {
  Badge,
  Icon,
  Button,
} from 'antd';
import actionCreators from './actions/ClientActions';
// import Radio from './components/Radio';
// import Comments from './components/Comments';
// import Interactions from './components/Interactions';
// import Btn from '@atlaskit/button';
// const ClientViews = {
//   1: <Comments comments={[]} />,
//   2: <Interactions />,
// };

const MainContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  border: 0px solid;
  padding: 50px 560px 20px 20px;
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
    // const currentClient = clients.filter(x => x.id === currentClientId)[0];
    // const fullName = currentClientId
    //   ? `Current Client: ${currentClient.firstName} ${currentClient.lastName}`
    //   : 'None selected...';
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
                <Button
                  style={{ margin: 5 }}
                  key="addBtn"
                  ghost={true}
                  size="small"
                  onClick={() => addClient(findMaxId(clients) + 1)}
                >
                  <Icon type="plus" />
                </Button>,
                <Button.Group
                  key="nav"
                  size="small"
                >
                  <Button
                    size="small"
                    ghost={true}
                    disabled={currentClientIndex === 0}
                    onClick={() => setCurrentClient(clients[currentClientIndex - 1].id)}
                  >
                    <Icon type="left" />
                  </Button>
                  <Button
                    key="nextBtn"
                    size="small"
                    ghost={true}
                    disabled={currentClientIndex === clients.length - 1}
                    onClick={() => setCurrentClient(clients[currentClientIndex + 1].id)}
                  >
                    <Icon type="right" />
                  </Button>
                </Button.Group>,
              ]
            }
            header={
              <StyledHeader>
                <Icon
                  type="idcard"
                  style={{ margin: 5 }}
                />
                <Badge
                  count={clients.length}
                  style={{background: theme.headingBackground2}}
                >
                  Clients
                </Badge>
              </StyledHeader>}
            isVisible={true}
          >
            <ClientBody />
            <ClientFooter />
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

const StyledHeader = styled.span`
  font-size: 1.2em;
  font-weight: normal;
`;