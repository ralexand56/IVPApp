import React, { Component } from 'react';
import styled from 'styled-components';
import { Client, Comment, User } from '../../datatypes';
// import CommentView from '../Comment';
// import { Avatar, Button, Icon, Popconfirm, Timeline } from 'antd';
// import moment from 'moment';
import actionCreators from '../../actions/ClientActions';
import SlidingPanel from '../SlidingPanel';
import ThemeInterface from '../../theme';
import TextArea from 'antd/lib/input/TextArea';
import CommentItem from '../Comment';

// const Search = Input.Search;

interface Props {
  addComment: typeof actionCreators.addComment;
  className?: string;
  children?: React.ReactChild;
  currentUser?: User;
  theme?: ThemeInterface;
  comments?: Comment[];
  currentClient: Client;
  deleteComment: typeof actionCreators.deleteComment;
}

interface AppState {
  value: string;
}

class Comments extends Component<Props, AppState> {
  state: AppState = { value: '' };

  clear = () => this.setState((prevState: AppState) => ({ value: '' }));

  onChange = (value: string) =>
    this.setState((prevState: AppState) => ({ value }));

  render() {
    const {
      addComment,
      className,
      comments,
      currentUser,
      currentClient,
      deleteComment
    } = this.props;

    // const {value} = this.state;

    // const suffix = value ? <Icon type="close-circle" onClick={this.clear} /> : null;

    return (
      <SlidingPanel title="Comments">
        <div className={className}>
          {' '}
          {currentUser && (
            <TextArea
              autosize={true}
              value={this.state.value}
              placeholder="new comment"
              onKeyPress={e => {
                if (e.charCode === 13) {
                  addComment(
                    {
                      id: '',
                      body: this.state.value,
                      created: new Date(),
                      userId: currentUser.id,
                      user: currentUser
                    },
                    currentClient,
                    currentUser
                  );
                  this.clear();
                  e.preventDefault();
                }
              }}
              onChange={e => this.onChange(e.currentTarget.value)}
            />
          )}
          {comments ? (
            renderComments(comments, currentClient, deleteComment)
          ) : (
            <span>No comments...</span>
          )}{' '}
        </div>
      </SlidingPanel>
    );
  }
}

const renderComments = (
  comments: Comment[],
  currentClient: Client,
  deleteComment: typeof actionCreators.deleteComment
) =>
  comments
    .sort((x, y) => (x.created > y.created ? -1 : 1))
    .map(x => <CommentItem key={x.id} comment={x} />);

const StyledComments = styled(Comments)`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
  color: ${props => props.theme.headingBackground1};
  padding: 0.4em;
  font-size: 0.8em;
  border: 0px solid black;
`;

export default StyledComments;
