import React, { StatelessComponent } from 'react';
import styled from 'styled-components';
import { Client, Comment, fadeIn, theme } from '../../datatypes';
// import CommentView from '../Comment';
import { Avatar, Button, Icon, Timeline } from 'antd';
import moment from 'moment';
import actionCreators from '../../actions/ClientActions';

interface Props {
  className?: string;
  children?: React.ReactChild;
  comments: Comment[];
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
  <div className={className}>
    <Timeline>
      {renderComments(comments, currentClient, deleteComment)}
    </Timeline>
  </div>
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
        <Button
          size="small"
          style={{ color: theme.headingBackground2, margin: 5 }}
          onClick={() => x.id && deleteComment(x.id, currentClient)}
        >
          <Icon type="minus" />
        </Button>
      </span>
    </Timeline.Item>
  ));

const StyledComments = styled(Comments)`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 10px;
  overflow-x: hidden;
  overflow-y: auto;
  border: 0px solid black;
  animation: ${fadeIn} 0.7s ease-in-out;
`;

export default StyledComments;
