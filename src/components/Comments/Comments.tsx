import React, { Component } from 'react';
import styled from 'styled-components';
import { Client, Comment, theme, User } from '../../datatypes';
// import CommentView from '../Comment';
import { Avatar, Button, Icon, Input, Popconfirm, Timeline } from 'antd';
import moment from 'moment';
import actionCreators from '../../actions/ClientActions';
import SlidingPanel from '../SlidingPanel';
import ThemeInterface from '../../theme';

const Search = Input.Search;

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

    return (
      <SlidingPanel title="Comments">
        <div className={className}>
          {' '}
          {currentUser && (
            <Search
              value={this.state.value}
              enterButton="ADD"
              placeholder="new comment"
              size="small"
              onChange={e => this.onChange(e.currentTarget.value)}
              onSearch={val => {
                addComment(
                  {
                    body: val,
                    created: new Date(),
                    userId: currentUser.id,
                    user: currentUser
                  },
                  currentClient,
                  currentUser
                );
                this.clear();
              }}
            />
          )}
          {comments ? (
            <Timeline style={{ margin: 10 }}>
              {renderComments(comments, currentClient, deleteComment)}
            </Timeline>
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
  comments.sort((x, y) => (x.created > y.created ? -1 : 1)).map(x => (
    <Timeline.Item key={x.id}>
      <span>
        {x.body}
        <small style={{ color: theme.headingBackground2 }}>
          - {moment(x.created).fromNow()}
        </small>
        <Avatar style={{ background: theme.headingBackground2 }} size="small">
          {`${x.user.firstName.charAt(0).toUpperCase()}${x.user.lastName
            .charAt(0)
            .toUpperCase()}`}
        </Avatar>
        <Popconfirm
          placement="top"
          title="Are you sure you want to delete comment?"
          onConfirm={() => x.id && deleteComment(x.id, currentClient)}
          okText="Yes"
          cancelText="No"
        >
          <Button
            size="small"
            style={{ color: theme.headingBackground2, margin: 5 }}
          >
            <Icon type="minus" />
          </Button>
        </Popconfirm>
      </span>
    </Timeline.Item>
  ));

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
