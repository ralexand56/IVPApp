import React, { Component } from 'react';
// import {
//   Card
// } from 'antd';
import './App.css';
import styled from 'styled-components';
import AppHeaderContainer from './components/AppHeaderContainer';
import SidePanelContainer from './components/SidePanel/SidePanelContainer';
import RevealPanel from './components/RevealPanel';
import EditableField from './components/EditableField';
import {
  Client,
} from './datatypes';
import {
  Icon,
} from 'antd';
import actionCreators from './actions/ClientActions';

const MainContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  border: 1px solid;
  padding: 50px;
`;

interface Props {
  clients: Client[];
  currentClientId: number | undefined;
  setCurrentClient: typeof actionCreators.setCurrentClient;
}

const Button = styled.button`
  background: transparent;
  border: none;
`;

// const StyledCard = styled(Card) `
//   color: orange;
//   margin: 50px;
//   width: 300px;
//   background: #ECECEC;
// `;

export default class App extends Component<Props, {}> {
  render() {
    const {
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
      <SidePanelContainer key="sidepanel" />,
      (
        <MainContainer key="main">
          <RevealPanel
            heading={
              <span>
                <Icon type="user" />
                {fullName}
                <Button
                  disabled={currentClientIndex === 0}
                  onClick={() => setCurrentClient(clients[currentClientIndex - 1].id)}
                >
                  <Icon type="left" />
                </Button>
                
                <Button
                  disabled={currentClientIndex === clients.length - 1}
                  onClick={() => setCurrentClient(clients[currentClientIndex + 1].id)}
                >
                  <Icon type="right" />
                </Button>
              </span>}
            isVisible={true}
          >
            <div>
              <EditableField
                label="First Name"
                txtValue={currentClient.firstName}
                isInEditMode={false}
              >
                <input value={currentClient.firstName} />
              </EditableField>
              <EditableField
                label="Last Name"
                txtValue={currentClient.lastName}
                isInEditMode={false}
              >
                <input value={currentClient.firstName} />
              </EditableField>
            </div>  
          </RevealPanel>
        </MainContainer>
      )
      ]
    );
  }
}
