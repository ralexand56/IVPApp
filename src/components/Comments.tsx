import React, { StatelessComponent } from 'react';
// import { Table } from 'antd';
import styled from 'styled-components';
import {
    fadeIn,
} from '../datatypes';
import Btn from '@atlaskit/button';
// import Comment, { CommentAuthor } from '@atlaskit/comment';

interface Props {
    className?: string;
    comments: Comment[];
}

const Comments: StatelessComponent<Props> = ({ className }) => (
    <div className={className}>
        <h2>Comments</h2>
        <Btn
        >
            Test
        </Btn>
    </div>
);

const StyledComments = styled(Comments) `
    animation: ${fadeIn} 0.7s ease-in-out;
`;
export default StyledComments;