import React, { StatelessComponent } from 'react';
import styled from '../../styled-components';
import { Client, TagItem } from '../../datatypes';
import { Select, Tag } from 'antd';
import actionCreators, {
  addAffiliationToFireStore,
} from '../../actions/ClientActions';
import SlidingPanel from '../SlidingPanel';
import ThemeInterface from '../../theme';
import AddValueButton from '../AddValueButton';
import { LabeledValue } from 'antd/lib/select';

const Option = Select.Option;

interface Props {
  affiliations: TagItem[];
  addAffiliation: typeof actionCreators.addAffiliation;
  addAffiliationToClient: typeof actionCreators.addAffiliationToClient;
  className?: string;
  currentClient: Client;
  isInEditMode: boolean;
  theme?: ThemeInterface;
  setClientAffiliations: typeof actionCreators.setClientAffiliations;
}

const handleOnChange = (
  values: string[] | string | LabeledValue | LabeledValue[],
  client: Client,
  setClientAffiliations: typeof actionCreators.setClientAffiliations,
  tagList: TagItem[],
) => {
  const valueArr = values.toString().split(',');
  const tagArr = valueArr.reduce(
    (accum: TagItem[], curr: string) => tagReducer(accum, curr, tagList),
    [],
  );

  setClientAffiliations(tagArr, client);
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

const handleAddAffiliation = async (
  val: string,
  isMinor: boolean,
  client: Client,
  addAffiliation: typeof actionCreators.addAffiliation,
  addAffiliationToClient: typeof actionCreators.addAffiliationToClient,
) => {
  if (val.trim() !== '') {
    const newAffiliate: TagItem | null = await addAffiliationToFireStore(val);
    const currentTags = client.affiliations;

    if (newAffiliate) {
      addAffiliation(newAffiliate);

      if (
        currentTags === undefined ||
        currentTags.find(x => x.id === newAffiliate.id) === undefined
      ) {
        addAffiliationToClient(newAffiliate, client);
      }
    }
  }
};

const AffliateInfo: StatelessComponent<Props> = ({
  addAffiliation,
  addAffiliationToClient,
  affiliations,
  className,
  currentClient,
  isInEditMode,
  setClientAffiliations,
}) => (
  <SlidingPanel title="Affliations">
    <div className={className}>
      {isInEditMode ? (
        <>
          <Select
            value={
              currentClient.affiliations
                ? currentClient.affiliations.map(x => x.id)
                : []
            }
            onChange={x =>
              handleOnChange(
                x,
                currentClient,
                setClientAffiliations,
                affiliations,
              )
            }
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Select Affliation"
          >
            {currentClient.affiliations &&
              currentClient.affiliations.map(x => (
                <Option key={x.id}>{x.name}</Option>
              ))}
          </Select>
          <AddValueButton
            label="Add tag..."
            addNewValue={(val: string) =>
              handleAddAffiliation(
                val,
                true,
                currentClient,
                addAffiliation,
                addAffiliationToClient,
              )
            }
          />
        </>
      ) : currentClient.affiliations &&
      currentClient.affiliations.length > 0 ? (
        <>
          {currentClient.affiliations.map(x => (
            <Tag key={x.id} style={{ margin: 3 }} color="magenta">
              {x.name}
            </Tag>
          ))}
        </>
      ) : (
        <span>No affliations</span>
      )}
    </div>
  </SlidingPanel>
);

const StyledAffliateInfo = styled(AffliateInfo)`
  color: ${props => props.theme.headingBackground1 || 'unset'};
  border: 1px solid ${props => props.theme.headingBackground2 || 'white'};
  font-size: 0.9em;
  padding: 5px;
`;

export default StyledAffliateInfo;
