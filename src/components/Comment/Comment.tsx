import React, { StatelessComponent } from 'react';
import styled from 'styled-components';
import {
    Client,
    Comment,
    fadeIn,
} from '../../datatypes';
import {
    Avatar,
    Button,
    Icon,
} from 'antd';
// import RevealPanel from '../RevealPanel';
import moment from 'moment';
import HorizontalLayout from '../HorizontalLayout';
import actionCreators from '../../actions/ClientActions';

interface Props {
    className?: string;
    children?: React.ReactChild;
    currentClient: Client;
    comment: Comment;
    deleteComment: typeof actionCreators.deleteComment;
}

const Comment: StatelessComponent<Props> = ({ className, comment, currentClient, deleteComment }) => (
    <div
        className={className}
    >
        <h4>{Header(comment)}</h4>
        <HorizontalLayout>
            {
                comment.body
            }
            <HorizontalLayout>
                <Button onClick={() => comment.id && deleteComment(comment.id, currentClient)}>
                    <Icon
                        type="delete"
                    />
                </Button>
                <Avatar
                    src={comment.user ? `./images/${comment.user.imgSrc}` : ''}
                />
            </HorizontalLayout>
        </HorizontalLayout>
    </div>
);

const Header = (comment: Comment) => (
    <HeaderWrapper>
        {
            comment.user
                ? `${comment.user.firstName} ${comment.user.lastName} commented on ${comment.created}`
                : `Irina commented on ${moment(comment.created).format('LLLL')}`
        }
    </HeaderWrapper>);

const HeaderWrapper = styled.div`
    font-size: 0.7em;
    padding: 1em;
    font-style: italic;
`;

const StyledComment = styled(Comment) `
    display: flex;
    flex-direction: column;
    box-shadow: 0px 0px 2px #666;
    border: 1px solid #666;
    border-radius: 10px;
    font-size: 1.0em;
    margin: 5px;
    padding: 5px;
    width: 100%;
    animation: ${fadeIn} 0.7s ease-in-out;
`;

export default StyledComment;