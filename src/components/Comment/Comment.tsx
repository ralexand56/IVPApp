import React, { StatelessComponent } from 'react';
import styled from 'styled-components';
import { Client, Comment, fadeIn } from '../../datatypes';
import { Button, Icon, Popconfirm } from 'antd';
// import RevealPanel from '../RevealPanel';
import moment from 'moment';
import HorizontalLayout from '../HorizontalLayout';
import actionCreators from '../../actions/ClientActions';

interface Props {
  className?: string;
  children?: React.ReactChild;
  currentClient: Client;
  comment: Comment;
  key: string;
  deleteComment: typeof actionCreators.deleteComment;
}

const Comment: StatelessComponent<Props> = ({
  className,
  comment,
  currentClient,
  deleteComment
}) => (
  <div className={className}>
    <HorizontalLayout>
      {Header(comment)}{' '}
      <span style={{ display: 'flex', marginLeft: 7 }}>
        <Button size="small" ghost={true}>
          <Icon style={{ fontSize: 9 }} type="edit" />
        </Button>
        <Popconfirm
          placement="top"
          title="Are you sure you want to delete comment?"
          onConfirm={() => comment.id && deleteComment(comment.id, currentClient)}
          okText="Yes"
          cancelText="No"
        >
          <Button size="small" ghost={true}>
            <Icon style={{ fontSize: 9 }} type="minus" />
          </Button>
        </Popconfirm>
      </span>
    </HorizontalLayout>
    <div>{comment.body}</div>
  </div>
);

const Header = (comment: Comment) => (
  <HeaderWrapper>
    <span>
      {moment(comment.created).format('M/D/YYYY h:mma')}
      {comment.user
        ? ` | ${comment.user.firstName} ${comment.user.lastName}`
        : `Irina commented on ${moment(comment.created).format('LLLL')}`}
    </span>
  </HeaderWrapper>
);

const HeaderWrapper = styled.div`
  font-size: 0.8em;
  letter-spacing: 2px;
  text-transform: uppercase;
  border-bottom: 1px solid;
  width: 100%;
  font-weight: bold;
  color: ${props => props.theme.headingBackground1};
`;

const StyledComment = styled(Comment)`
  display: flex;
  color: white;
  flex-direction: column;
  box-shadow: 1px 1px 3px ${props => props.theme.headingBackground2};
  background: ${props => props.theme.headingBackground2};
  border: 0px solid #666;
  border-radius: 10px;
  font-size: 1em;
  padding: 5px;
  width: 100%;
  margin: 2px 0px;
  animation: ${fadeIn} 0.7s ease-in-out;
`;

export default StyledComment;
