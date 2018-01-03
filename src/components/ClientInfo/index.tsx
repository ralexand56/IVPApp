import React, { StatelessComponent } from 'react';
import styled from '../../styled-components';
import { Client, fadeIn, fadeOut } from '../../datatypes';
import actionCreators from '../../actions/ClientActions';
import SlideRevealPanel from '../SlideRevealPanel';
import ThemeInterface from '../../theme';

interface Props {
  className?: string;
  currentClient: Client;
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
  theme,
}) => (
  <div className={className}>
    <SlideRevealPanel
      isVisible={showClient}
      endColor={theme ? theme.headingBackground2 : 'white'}
    >
      <p>{currentClient.firstName}</p>
      <p>{currentClient.lastName}</p>
    </SlideRevealPanel>
  </div>
);

const StyledClientInfo = styled(ClientInfo)`
  display: flex;
  position: absolute;
  top: 0;
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
  padding: 4.0em 1.0em;
  animation: ${(props: { isVisible: Boolean }) =>
      props.isVisible ? fadeIn : fadeOut}
    0.5s ease-in-out both;
`;

export default StyledClientInfo;
