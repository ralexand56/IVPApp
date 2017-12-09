import React from 'react';
import styled from 'styled-components';
import { Client, theme } from '../../datatypes';
import actionCreators from '../../actions/ClientActions';
import { Badge, Icon, Button } from 'antd';
import RevealPanel from '../RevealPanel';
import ClientBody from '../ClientBody';
import ClientFooter from '../ClientFooter';

interface Props {
  currentClientIndex: number;
  addClient: typeof actionCreators.addClient;
  clients: Client[];
  setCurrentClient: typeof actionCreators.setCurrentClient;
}

const findMaxId = (clients: Client[]) => {
  let max = 0;

  clients.map(x => (x.id >= max ? (max = x.id) : null));
  return max;
};

const StyledHeader = styled.span`
  font-size: 1.2em;
  font-weight: normal;
`;

const MainContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  border: 0px solid;
  padding: 50px 560px 20px 20px;
`;

const MainBody = (props: Props) => (
  <MainContainer>
    <RevealPanel
      endColor={theme.bodyBackground}
      actions={[
        <Button
          style={{ margin: 5 }}
          key="addBtn"
          ghost={true}
          size="small"
          onClick={() => props.addClient(findMaxId(props.clients) + 1)}
        >
          <Icon type="plus" />
        </Button>,
        <Button.Group key="nav" size="small">
          <Button
            size="small"
            ghost={true}
            disabled={props.currentClientIndex === 0}
            onClick={() =>
              props.setCurrentClient(
                props.clients[props.currentClientIndex - 1].id,
              )
            }
          >
            <Icon type="left" />
          </Button>
          <Button
            key="nextBtn"
            size="small"
            ghost={true}
            disabled={props.currentClientIndex === props.clients.length - 1}
            onClick={() =>
              props.setCurrentClient(
                props.clients[props.currentClientIndex + 1].id,
              )
            }
          >
            <Icon type="right" />
          </Button>
        </Button.Group>,
      ]}
      header={
        <StyledHeader>
          <Icon type="idcard" style={{ margin: 5 }} />
          <Badge
            count={props.clients.length}
            style={{ background: theme.headingBackground2 }}
          >
            Clients
          </Badge>
        </StyledHeader>
      }
      isVisible={true}
    >
            <ClientBody />
      <ClientFooter />      
    </RevealPanel>
  </MainContainer>
);

export default MainBody;