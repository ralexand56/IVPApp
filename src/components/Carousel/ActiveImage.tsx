import React, { StatelessComponent } from 'react';
import styled from 'styled-components';
import { SampleLink, fadeIn, fadeOut } from '../../datatypes';
import ThemeInterface from '../../theme';

interface Props {
  className?: string;
  sample?: SampleLink;
  isActive: boolean;
  theme?: ThemeInterface;
}

const ActiveImage: StatelessComponent<Props> = ({ className, sample }) => (
  <div className={className}>
    {sample && sample.caption && <Caption>{sample && sample.caption}</Caption>}
  </div>
);

const Caption = styled.div`
  color: white;
  background: rgba(134, 114, 144, 0.7);
  align-self: flex-end;
  padding: 7px;
  text-transform: uppercase;
  justify-content: center;
`;

export default styled(ActiveImage)`
  display: ${props => (props.isActive ? 'flex' : 'none')};
  min-width: 400px;
  min-height: 300px;
  border-radius: 5px;
  background: white;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url('${props => (props.sample ? props.sample.src : '')}');
    animation: ${props => (props.isActive ? fadeIn : fadeOut)} 0.7s ease-in-out;
`;
