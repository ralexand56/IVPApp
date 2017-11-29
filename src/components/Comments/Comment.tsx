import React, { StatelessComponent } from 'react';
import styled from 'styled-components';
import {
    Comment,
    fadeIn,
} from '../../datatypes';
import {
    Avatar
} from 'antd';
import RevealPanel from '../RevealPanel';
import moment from 'moment';
import HorizontalLayout from '../HorizontalLayout';

interface Props {
    className?: string;
    children?: React.ReactChild;
    comment: Comment;
}

const Comment: StatelessComponent<Props> = ({ className, comment }) => (
    <RevealPanel
        className={className}
        header={Header(comment)}
    >
        <HorizontalLayout>
            {
                comment.body
            }
            <Avatar
                src={comment.user ? `/images/${comment.user.imgSrc }` : ''}
            />
        </HorizontalLayout>
    </RevealPanel>
);

const Header = (comment: Comment) => (
    <HeaderWrapper>
        {
            comment.user
                ? `${comment.user.firstName} ${comment.user.lastName} commented on ${comment.created}`
                : `Irina commented on ${moment().format('LLLL')}`
        }
    </HeaderWrapper>);

const HeaderWrapper = styled.div`
    color: white;
    font-size: 0.7em;
    padding: 1em;
    font-style: italic;
`;

const StyledComment = styled(Comment) `
    display: flex;
    box-shadow: 0px 0px 5px #666;
    border-radius: 10px;
    font-size: 1.4em;
    margin: 7px;
    min-height: 100px;
    margin: 5px;
    width: 100%;
    animation: ${fadeIn} 0.7s ease-in-out;
`;

export default StyledComment;