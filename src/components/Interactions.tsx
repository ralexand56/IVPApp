import React, { StatelessComponent } from 'react';
import { Table } from 'antd';
import styled from 'styled-components';
import {
    fadeIn,
    Interaction
} from '../datatypes';

interface Props {
    className?: string;
    interactions?: Interaction[];
}

const Interactions: StatelessComponent<Props> = ({ className }) => (
    <div className={className}>
        <h2>Interactions</h2>
        <Table />
    </div>
);

const StyledInteractions = styled(Interactions) `
    animation: ${fadeIn} 0.7s;
`;
export default StyledInteractions;