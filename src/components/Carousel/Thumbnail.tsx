import React, { StatelessComponent } from 'react';
import styled from 'styled-components';
import { SampleLink } from '../../datatypes';

interface Props {
  className?: string;
  sample: SampleLink;
  activeId?: string | null;
  handleSetActive: (id: string) => void;
}

const Thumbnail: StatelessComponent<Props> = ({
  sample,
  className,
  handleSetActive
}) => (
  <div
    className={className}
    onClick={() => sample && handleSetActive(sample.id)}
  />
);

export default styled(Thumbnail)`
  display: inline-block;
  cursor: pointer;
  border-radius: 3px;
  min-width: 50px;
  min-height: 50px;
  box-shadow: ${props =>
    props.activeId === props.sample.id
      ? 'none'
      : '1px 1px 3px rgba(0, 0, 0, 0.5)'};
      opacity: ${props =>
    props.activeId === props.sample.id
      ? 0.7
      : 1.0};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('${props => (props.sample ? props.sample.src : '')}');
  margin: 5px;
  transition: all 0.3s ease-in-out;
  &:hover {
    box-shadow: none;
    opacity: 0.7;
  }
`;
