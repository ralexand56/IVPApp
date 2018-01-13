import React, { StatelessComponent } from 'react';
import styled from '../../styled-components';
import { Client } from '../../datatypes';
// import EditableField from '../EditableField';
import { Select, Tag } from 'antd';
import actionCreators from '../../actions/ClientActions';
import HorizontalPanel from '../HorizontalLayout';
import SlidingPanel from '../SlidingPanel';
import ThemeInterface from '../../theme';

interface Props {
  className?: string;
  children?: React.ReactChild;
  theme?: ThemeInterface;
  isInEditMode: boolean;
  currentClient: Client;
  setClientEditMode: typeof actionCreators.setClientEditMode;
  updateClient: typeof actionCreators.updateClient;
}

const ArtGroup: StatelessComponent<Props> = ({
  className,
  currentClient,
  isInEditMode,
  updateClient,
}) => (
  <SlidingPanel title="Art Group">
    <div className={className}>
      <HorizontalPanel>
        Main
        <Tag style={{ margin: 3 }} color="blue">
          Painting
        </Tag>
        {isInEditMode ? <Select /> : null}
        Secondary
        <Tag style={{ margin: 3 }} color="purple">
          Oils
        </Tag>
        <Tag style={{ margin: 3 }} color="purple">
          WaterColor
        </Tag>
        {isInEditMode ? <Select /> : null}
      </HorizontalPanel>
    </div>
  </SlidingPanel>
);

const StyledArtGroup = styled(ArtGroup)`
  display: flex;
  font-size: 0.7em;
  color: ${props => props.theme.headingBackground2 || 'black'};
  padding: 0.7em;
  text-transform: uppercase;
`;

export default StyledArtGroup;
