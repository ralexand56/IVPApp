import React, { StatelessComponent } from 'react';
import styled from 'styled-components';
import { Client } from '../../datatypes';
import HorizontalPanel from '../HorizontalLayout';
import SlidingPanel from '../SlidingPanel';

interface Props {
  className?: string;
  currentClient: Client;
  children?: React.ReactChild;
}

const Index: StatelessComponent<Props> = ({ className, currentClient }) => {
  return (
    <div className={className}>
      <CenterPanel>
        <Column1>
          <SlidingPanel title="info">
            <HorizontalPanel>
              <span>{currentClient.firstName} {currentClient.lastName}</span>
            </HorizontalPanel>
          </SlidingPanel>
        </Column1>
        <Column2>
          <SlidingPanel title="Sample Work">
            <h1>image (Work)</h1>
          </SlidingPanel>
        </Column2>
      </CenterPanel>
    </div>
  );
};

const CenterPanel = styled.div`
  display: flex;
  background: ${props => props.theme.headingBackground1};
  font-size: 1em;
  padding: 1em;
  width: 1072px;
`;

const Column1 = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
`;

const Column2 = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const StyledIndex = styled(Index)`
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  font-size: 2em;
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
