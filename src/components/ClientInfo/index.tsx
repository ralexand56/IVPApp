import React, { StatelessComponent } from 'react';
import styled from '../../styled-components';
import { Button, Icon } from 'antd';
import { Client, HeaderStyle } from '../../datatypes';
import actionCreators from '../../actions/ClientActions';
import HorizontalPanel from '../HorizontalLayout';
import SlidingPanel from '../SlidingPanel';
import ThemeInterface from '../../theme';

interface Props {
  className?: string;
  currentClient: Client | undefined;
  isInEditMode?: boolean;
  showClient?: boolean;
  setCurrentClient: typeof actionCreators.setCurrentClient;
  theme?: ThemeInterface;
}

const ClientInfo: StatelessComponent<Props> = ({
  className,
  currentClient,
  setCurrentClient,
  showClient,
  theme
}) => (
  <div className={className}>
    <SlidingPanel
      title={
        <HeaderStyle>
          <HorizontalPanel>
            <span>info</span>
            <Button
              ghost={true}
              size="small"
              onClick={() => setCurrentClient(undefined)}
            >
              <Icon type="close" />
            </Button>
          </HorizontalPanel>
        </HeaderStyle>
        }
      isOpen={currentClient !== undefined}
    >
        <>
        <p>{currentClient ? currentClient.firstName : ''}</p>
        <p>{currentClient ? currentClient.lastName : ''}</p>
      </>
    </SlidingPanel>
  </div>
);

const StyledClientInfo = styled(ClientInfo)`
  flex-direction: column;
  position: absolute;
  top: 0px;
  background: rgba(0, 0, 0, 0.4);
  margin: 59px 0 0 0;
  width: 100%;
  height: 100%;
`;

export default StyledClientInfo;
