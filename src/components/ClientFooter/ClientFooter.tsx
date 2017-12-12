import React, { StatelessComponent } from 'react';
import styled from 'styled-components';
import { Client, Comment, theme, User } from '../../datatypes';
import { Icon, Input } from 'antd';
import RevealPanel from '../RevealPanel';
import Radio from '../Radio';
import actionCreators from '../../actions/ClientActions';
import Admin from '../Admin';
import Comments from '../Comments';
import ClientBody from '../ClientBody';
import TagsView from '../TagsView';

const ClientViews = {
  1: <ClientBody />,
  2: <Comments />,
  5: <TagsView />,
  6: <Admin />,
};

const Search = Input.Search;

interface Props {
  addComment: typeof actionCreators.addComment;
  className?: string;
  children?: React.ReactChild;
  currentClient: Client;
  currentUser?: User;
  selectedClientTabId: number;
  setClientTab: typeof actionCreators.setClientTab;
}

const ClientFooter: StatelessComponent<Props> = ({
  addComment,
  className,
  children,
  currentClient,
  currentUser,
  selectedClientTabId,
  setClientTab,
}) => (
  <div className={className}>
    <RevealPanel
      header={
        <Radio
          label={`${currentClient.firstName} ${currentClient.lastName}`}
          labelColor="white"
          itemColor="white"
          activeColor="#ddd"
          items={[
            { name: 'Home', id: 1 },
            { name: 'Comments', id: 2 },
            { name: 'Interactions', id: 3 },
            { name: 'Sample Assets', id: 4 },
            { name: 'Tags', id: 5 },
            { name: 'Admin', id: 6 },
          ]}
          selectedPropsId={selectedClientTabId}
          onChange={(id: number) => setClientTab(id)}
          underlineColor={theme.headingBackground2}
          margin={0}
        />
      }
      actions={getActions(
        selectedClientTabId,
        currentClient,
        addComment,
        currentUser,
      )}
      width="100%"
    >
      {selectedClientTabId ? ClientViews[selectedClientTabId] : <h4>Error!</h4>}
    </RevealPanel>
  </div>
);

const StyledClientFooter = styled(ClientFooter)`
  display: flex;
  height: 100%;
  margin: 5px;
  border: 0px solid white;
`;

export default StyledClientFooter;

const getActions = (
  tabId: number,
  currentClient: Client,
  addComment: typeof actionCreators.addComment,
  currentUser?: User,
) => {
  switch (tabId) {
    case 2:
      return (
        <Search
          style={{ width: 300 }}
          onSearch={val =>
            handleAddComment(addComment, currentClient, val, currentUser)
          }
          placeholder="add comment..."
          enterButton={<Icon type="plus" />}
        />
      );

    default:
      return <span />;
  }
};

const handleAddComment = (
  addComment: typeof actionCreators.addComment,
  currentClient: Client,
  body: string,
  currentUser?: User,
) => {
  const newComment: Comment = {
    body,
    created: new Date(),
    userId: currentUser ? currentUser.id : '',
  };

  addComment(newComment, currentClient);
};
