import React, { StatelessComponent } from 'react';
import styled from 'styled-components';
import { Client, theme } from '../../datatypes';
import actionCreators from '../../actions/ClientActions';
import { Badge, Icon, Button } from 'antd';
import RevealPanel from '../RevealPanel';
import ClientFooter from '../ClientFooter';

interface Props {
  className?: string;
  currentClient: Client;
  currentClientIndex: number;
  addClient: typeof actionCreators.addClient;
  clients: Client[];
  searchResultsIsVisible: boolean;
  setCurrentClient: typeof actionCreators.setCurrentClient;
}

const StyledHeader = styled.span`
  color: white;
  font-size: 1.4em;
  font-weight: normal;
`;

const MainBody: StatelessComponent<Props> = (props: Props) => (
  <div className={props.className}>
    <RevealPanel
      endColor={theme.bodyBackground}
      actions={[
        <Button
          style={{ margin: 5 }}
          key="addBtn"
          ghost={true}
          size="small"
          onClick={() => props.addClient()}
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
            overflowCount={10000}
            style={{ background: theme.headingBackground2, color: 'white' }}
          >
            <span style={{ color: 'white', padding: 7 }}>Clients</span>
          </Badge>
        </StyledHeader>
      }
      isVisible={true}
    >
      {props.currentClient ? (
        <>
          <ClientFooter />
        </>
      ) : (
        <span />
      )}
    </RevealPanel>
  </div>
);

const StyledMainBody = styled(MainBody)`
  position: relative;
  width: 100vw;
  height: 100vh;
  border: 0px solid;
  padding: ${props =>
    props.searchResultsIsVisible
      ? `50px 520px 20px 20px`
      : `50px 20px 20px 20px`};
`;

export default StyledMainBody;
