import React, { StatelessComponent } from 'react';
import styled from 'styled-components';
import { SampleLink } from '../../datatypes';
import Thumbnail from './Thumbnail';

interface Props {
  activeId?: string | null;
  className?: string;
  sampleLinks?: SampleLink[];
  handleSetActive: (id: string) => void;
}

const Thumbnails: StatelessComponent<Props> = ({
  activeId,
  className,
  handleSetActive,
  sampleLinks
}) => (
  <div className={className}>
    {sampleLinks &&
      sampleLinks.map(x => (
        <Thumbnail key={x.id} activeId={activeId} sample={x} handleSetActive={handleSetActive} />
      ))}
  </div>
);

export default styled(Thumbnails)`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  width: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
`;
