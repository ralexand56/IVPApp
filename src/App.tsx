import React, { Component } from 'react';
// import {
//   Card
// } from 'antd';
import './App.css';
import styled from 'styled-components';
import AppHeaderContainer from './components/AppHeaderContainer';
import SidePanelContainer from './components/SidePanel/SidePanelContainer';
import RevealPanel from './components/RevealPanel';

const MainContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  border: 1px solid;
  padding: 50px;
`;

// const StyledCard = styled(Card) `
//   color: orange;
//   margin: 50px;
//   width: 300px;
//   background: #ECECEC;
// `;

export default class App extends Component<{}, {}> {
  render() {
    return (
      [<AppHeaderContainer key="header" />,
      <SidePanelContainer key="sidepanel" />,
      (
        <MainContainer key="main">
          <RevealPanel isVisible={true}>
            <h2>Hi!</h2>
          </RevealPanel>
        </MainContainer>
      )
      ]
    );
  }
}
