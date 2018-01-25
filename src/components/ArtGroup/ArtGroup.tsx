import React, { StatelessComponent } from 'react';
import styled from '../../styled-components';
import { Client, TagItem } from '../../datatypes';
import { Select, Tag } from 'antd';
import actionCreators, { addTagToFireStore } from '../../actions/ClientActions';
import HorizontalPanel from '../HorizontalLayout';
import SlidingPanel from '../SlidingPanel';
import ThemeInterface from '../../theme';
import AddValueButton from '../AddValueButton';
import { LabeledValue } from 'antd/lib/select';

const Option = Select.Option;

interface Props {
  addTag: typeof actionCreators.addTag;
  addTagToClient: typeof actionCreators.addTagToClient;
  className?: string;
  children?: React.ReactChild;
  theme?: ThemeInterface;
  isInEditMode: boolean;
  majorTags: TagItem[];
  minorTags: TagItem[];
  currentClient: Client;
  setClientEditMode: typeof actionCreators.setClientEditMode;
  setClientTags: typeof actionCreators.setClientTags;
  updateClient: typeof actionCreators.updateClient;
}

const handleOnChange = (
  values: string[] | string | LabeledValue | LabeledValue[],
  isMinor: boolean,
  client: Client,
  setClientTags: typeof actionCreators.setClientTags,
  tagList: TagItem[],
) => {
  // const tags = client.majorTags ? client.majorTags : [];
  const valueArr = values.toString().split(',');
  const tagArr = valueArr.reduce(
    (accum: TagItem[], curr: string) => tagReducer(accum, curr, tagList),
    [],
  );

  setClientTags(tagArr, client, isMinor);
};

const tagReducer = (accum: TagItem[], curr: string, tagList: TagItem[]) => {
  const fndItem = findTagItem(curr, tagList);

  if (fndItem) {
    return [...accum, fndItem];
  } else {
    return accum;
  }
};

const findTagItem = (id: string, arr: TagItem[]) =>
  arr.find(x => x.id === id) ? arr.find(x => x.id === id) : undefined;

const handleAddTag = async (
  val: string,
  isMinor: boolean,
  client: Client,
  addTag: typeof actionCreators.addTag,
  addTagToClient: typeof actionCreators.addTagToClient,
) => {
  if (val.trim() !== '') {
    const newTag: TagItem | null = await addTagToFireStore(val, isMinor);
    const currentTags = isMinor ? client.minorTags : client.majorTags;

    if (newTag) {
      addTag(newTag, isMinor);

      if (
        currentTags === undefined ||
        currentTags.find(x => x.id === newTag.id) === undefined
      ) {
        addTagToClient(newTag, client, isMinor);
      }
    }
  }
};

const ArtGroup: StatelessComponent<Props> = ({
  addTag,
  addTagToClient,
  className,
  currentClient,
  majorTags,
  minorTags,
  isInEditMode,
  setClientTags,
  updateClient,
}) => (
  <SlidingPanel title="Art Group">
    <div className={className}>
      <HorizontalPanel>
        Main
        {isInEditMode ? (
          <>
            <Select
              value={
                currentClient.majorTags
                  ? currentClient.majorTags.map(x => x.id)
                  : []
              }
              onChange={x =>
                handleOnChange(
                  x,
                  false,
                  currentClient,
                  setClientTags,
                  majorTags,
                )
              }
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
              placeholder="Select Tag"
            >
              {majorTags.map(x => <Option key={x.id}>{x.name}</Option>)}
            </Select>
            <AddValueButton
              label="Add tag..."
              addNewValue={(val: string) =>
                handleAddTag(val, false, currentClient, addTag, addTagToClient)
              }
            />
          </>
        ) : (
          <>
            {currentClient.majorTags &&
              currentClient.majorTags.map(x => (
                <Tag key={x.id} style={{ margin: 3 }} color="blue">
                  {x.name}
                </Tag>
              ))}
          </>
        )}
      </HorizontalPanel>
      <HorizontalPanel>
        <span>Secondary</span>
        {isInEditMode ? (
          <>
            <Select
              value={
                currentClient.minorTags
                  ? currentClient.minorTags.map(x => x.id)
                  : []
              }
              onChange={x =>
                handleOnChange(
                  x,
                  true,
                  currentClient,
                  setClientTags,
                  minorTags,
                )
              }
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Select Tag"
            >
              {minorTags.map(x => <Option key={x.id}>{x.name}</Option>)}
            </Select>
            <AddValueButton
              label="Add tag..."
              addNewValue={(val: string) =>
                handleAddTag(val, true, currentClient, addTag, addTagToClient)
              }
            />
          </>
        ) : (
          <>
            {currentClient.minorTags &&
              currentClient.minorTags.map(x => (
                <Tag key={x.id} style={{ margin: 3 }} color="purple">
                  {x.name}
                </Tag>
              ))}
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
