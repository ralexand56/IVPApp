import React, { StatelessComponent } from 'react';
import styled from 'styled-components';
import {
    Comment,
    fadeIn,
} from '../../datatypes';
import CommentView from '../Comment';
import { Timeline } from 'antd';

interface Props {
    className?: string;
    children?: React.ReactChild;
    comments: Comment[];
}

const Comments: StatelessComponent<Props> = ({
    className,
    children,
    comments,
 }) => (
        <Timeline className={className}>
            {
                renderComments(comments)
            }
        </Timeline>
    );

const renderComments = (comments: Comment[]) => (
    comments
        .sort((x, y) => x.created > y.created ? -1 : 1)
        .map(x => <Timeline.Item key={x.id} ><CommentView key={x.id}  comment={x} /></Timeline.Item>)
);

const StyledComments = styled(Comments) `
    background: white;
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
    margin: 0px;
    padding: 10px;
    overflow-x: hidden;
    overflow-y: auto;
    border: 0px solid white;
    animation: ${fadeIn} 0.7s ease-in-out;
`;

export default StyledComments;