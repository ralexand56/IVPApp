import React, { StatelessComponent } from 'react';
import { Icon, Input } from 'antd';
import { Client, Comment, User } from '../../datatypes';
import actionCreators from '../../actions/ClientActions';

const Search = Input.Search;

interface Props {
  addComment: typeof actionCreators.addComment;
  className?: string;
  currentClient: Client;
  currentUser?: User;
  newCommentText: string;
  updateCommentText: typeof actionCreators.updateCommentText;
}

const AddCommentMenu: StatelessComponent<Props> = props => {
  const {
    addComment,
    currentClient,
    currentUser,
    newCommentText,
    updateCommentText,
  } = props;

  return currentUser ? (
    <Search
      style={{ width: 300 }}
      onSearch={val =>
        handleAddComment(addComment, currentClient, val, currentUser)
      }
      value={newCommentText}
      onChange={(e) => updateCommentText(e.currentTarget.value)}
      placeholder="add comment..."
      enterButton={<Icon type="plus" />}
    />
  ) : null;
};

export default AddCommentMenu;

const handleAddComment = (
  addComment: typeof actionCreators.addComment,
  currentClient: Client,
  body: string,
  currentUser: User,
) => {
  const newComment: Comment = {
    body,
    created: new Date(),
    userId: currentUser ? currentUser.id : '',
    user: currentUser,
  };

  addComment(newComment, currentClient, currentUser);
};
