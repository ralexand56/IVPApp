import React, { StatelessComponent } from 'react';
import styled from '../../styled-components';
import { Client, TagItem } from '../../datatypes';
// import EditableField from '../EditableField';
import { Select, Tag } from 'antd';
import actionCreators from '../../actions/ClientActions';
import HorizontalPanel from '../HorizontalLayout';
import SlidingPanel from '../SlidingPanel';
import ThemeInterface from '../../theme';
import AddValueButton from '../AddValueButton';

const Option = Select.Option;

interface Props {
  addTag: typeof actionCreators.addTag;
  className?: string;
  children?: React.ReactChild;
  theme?: ThemeInterface;
  isInEditMode: boolean;
  majorTags: TagItem[];
  minorTags: TagItem[];
  currentClient: Client;
  setClientEditMode: typeof actionCreators.setClientEditMode;
  updateClient: typeof actionCreators.updateClient;
}

const ArtGroup: StatelessComponent<Props> = ({
  addTag,
  className,
  currentClient,
  majorTags,
  minorTags,
  isInEditMode,
  updateClient,
}) => (
  <SlidingPanel title="Art Group">
    <div className={className}>
      <HorizontalPanel>
        Main
        {isInEditMode ? (
          <>
            <Select
              filterOption={(val, opt) =>
                opt.props.children &&
                opt.props.children
                  .toString()
                  .toLowerCase()
                  .startsWith(val.toLowerCase())
              }
              mode="multiple"
              style={{ width: '100%' }}
              optionFilterProp="name"
              labelInValue={true}
              placeholder="Select Tag"
            >
              {majorTags.map(x => <Option key={x.id}>{x.name}</Option>)}
            </Select>
            <AddValueButton
              label="Add tag..."
              addNewValue={(val: string) => addTag(val, false)}
            />
          </>
        ) : (
          <Tag style={{ margin: 3 }} color="blue">
            Painting
          </Tag>
        )}
        <span>Secondary</span>
        {isInEditMode ? (
          <>
            <Select
              labelInValue={true}
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Select Tag"
            >
              {minorTags.map(x => (
                <Option key={x.name!.toLowerCase()}>{x.name}</Option>
              ))}
            </Select>
            <AddValueButton
              label="Add tag..."
              addNewValue={(val: string) => addTag(val, true)}
            />
          </>
        ) : (
          <>
            <Tag style={{ margin: 3 }} color="purple">
              Oils
            </Tag>
            <Tag style={{ margin: 3 }} color="purple">
              WaterColor
            </Tag>
          </>
        )}
      </HorizontalPanel>
    </div>
  </SlidingPanel>
);

// const handleAddMinorTag = (val: string, addTag: typeof actionCreators.addTag) => addTag(val);

const StyledArtGroup = styled(ArtGroup)`
  display: block;
  font-size: 0.7em;
  color: ${props => props.theme.headingBackground2 || 'black'};
  padding: 0.7em;
  text-transform: uppercase;
`;

export default StyledArtGroup;
