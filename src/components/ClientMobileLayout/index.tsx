import React, { StatelessComponent } from 'react';
import styled from 'styled-components';
import { Client } from '../../datatypes';

interface Props {
  className?: string;
  currentClient: Client;
  children?: React.ReactChild;
}

const Index: StatelessComponent<Props> = ({ className, currentClient }) => {
  return (
    <div className={className}>
      <span>Mobile Coming Soon</span>
    </div>
  );
};

const StyledIndex = styled(Index)`
  background: rgba(255, 255, 255, 0.7);
  display: none;
  font-size: 2em;
  position: absolute;
  top: 0;
  margin: 59px 0 0 0;
  width: 100%;
  height: 100%;
  @media (max-width: 700px) {
    display: flex;
    justify-content: center;
  }
`;

export default StyledIndex;
