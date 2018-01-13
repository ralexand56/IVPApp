import React, { StatelessComponent } from 'react';
import styled from 'styled-components';
import { Client, Comment, theme } from '../../datatypes';
// import CommentView from '../Comment';
import { Avatar, Button, Icon, Popconfirm, Timeline } from 'antd';
import moment from 'moment';
import actionCreators from '../../actions/ClientActions';
import SlidingPanel from '../SlidingPanel';

interface Props {
  className?: string;
  children?: React.ReactChild;
  comments?: Comment[];
  currentClient: Client;
  deleteComment: typeof actionCreators.deleteComment;
}

const Comments: StatelessComponent<Props> = ({
  className,
  children,
  comments,
  currentClient,
  deleteComment,
}) => (
  <SlidingPanel title="Comments">
    <div className={className}>
      {comments ? (
        <Timeline>
          {renderComments(comments, currentClient, deleteComment)}
        </Timeline>
      ) : (
        <span>No comments...</span>
      )}{' '}
    </div>
  </SlidingPanel>
);

const renderComments = (
  comments: Comment[],
  currentClient: Client,
  deleteComment: typeof actionCreators.deleteComment,
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
  padding: 0.4em;

  font-size: 0.8em;
  border: 0px solid black;
`;

export default StyledComments;
