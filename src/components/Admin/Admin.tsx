import React, { StatelessComponent } from 'react';
import { Button, Divider, Icon, Input, Tag } from 'antd';
import HorizontalLayout from '../HorizontalLayout';
import styled from 'styled-components';
import actionCreators from '../../actions/ClientActions';
import { ClientType, fadeIn, TagCategory } from '../../datatypes';

const Search = Input.Search;

interface Props {
  addClientType: typeof actionCreators.addClientType;
  addTagToCategory: typeof actionCreators.addTagToCategory;
  clientTypes: ClientType[];
  className?: string;
  importClients: typeof actionCreators.importClients;
  tagCategories: TagCategory[];
}

const Admin: StatelessComponent<Props> = props => (
  <div className={props.className}>
    <Button onClick={() => props.importClients()}>Import</Button>
    <HorizontalLayout>
      <Search
        placeholder="Add Client Type..."
        onSearch={(val: string) => props.addClientType(val)}
      />
      <Button>
        <Icon type="plus" />
      </Button>
    </HorizontalLayout>
    {props.clientTypes.map(x => <h4 key={x.id}>{x.name}</h4>)}
    <Divider />
    <HorizontalLayout>
      <Search
        placeholder="Add Tag Category..."
      />
      <Button>
        <Icon type="plus" />
      </Button>
    </HorizontalLayout>
    {renderCategories(props.tagCategories, props.addTagToCategory)}
  </div>
);

const StyledAdmin = styled(Admin)`
  overflow: auto;
  animation: ${fadeIn} 0.7s ease-in-out both;
`;

export default StyledAdmin;

const renderCategories = (
  tagCategories: TagCategory[],
  addTagToCategory: typeof actionCreators.addTagToCategory,
) => {
  return tagCategories.map(x => (
    <div key={x.id}>
      <Divider />
      <HorizontalLayout>
        <h4>{x.name}</h4>
        <Search
          style={{ paddingLeft: 10 }}
          placeholder="Add Tag to this Category..."
          onSearch={(val: string) => addTagToCategory(val, x)}
        />
        <Button>
          <Icon type="plus" />
        </Button>
      </HorizontalLayout>
      {x.tags &&
        x.tags.map(y => (
          <Tag key={y.id} color="blue">
            {y.name}
          </Tag>
        ))}
    </div>
  ));
};
