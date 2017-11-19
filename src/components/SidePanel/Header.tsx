import React, { StatelessComponent } from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';

interface Props {
    children?: React.ReactChild;
    className?: string;
    close?: Function;
    header?: string;
    isOpen?: boolean;
}

const Header: StatelessComponent<Props> = ({ header, children, close, className, isOpen }) => (
    <div className={className}>
        {header || 'Search Results...'}
        <Icon type="close" />
    </div>
);

const StyledHeader = styled(Header) `
    align-items: center;
    background: salmon;
    color: white;
    display: flex;
    font-weight: normal;
    font-size: 1.4em;
    font-style: italic;
    justify-content: space-between;
    left: 0;
    top: 15px;
    padding: 5px 15px;
    position: absolute;
    overflow: hidden;
    width: 100%;
`;

export default StyledHeader;