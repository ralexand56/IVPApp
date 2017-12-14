import React, { StatelessComponent } from 'react';
import styled, { keyframes } from 'styled-components';
import actionCreators from '../../actions/ClientActions';
import { Icon } from 'antd';

interface Props {
    backgroundColor?: string;
    children?: React.ReactChild;
    className?: string;
    close: typeof actionCreators.setSearchResultsVisibility;
    header?: React.ReactChild;
    isOpen?: boolean;
}

const defaultHeight: string = '50px';

const expand = (props: Props) => keyframes`
0% {
    height: 0px;
}
100% {
    height: ${defaultHeight};
}
`;

const collapse = (props: Props) => keyframes`
 0% {
    height: ${defaultHeight};
}
100% {
    height: 0px;
}
`;

const Header: StatelessComponent<Props> = ({ header, children, close, className, isOpen }) => (
    <div className={className}>
        {header || 'Search Results...'}
        <Icon type="close" onClick={() => close(!isOpen)} />
    </div>
);

const StyledHeader = styled(Header) `
    align-items: center;
    background: ${props => props.backgroundColor || 'gray'};
    color: white;
    display: flex;
    font-weight: normal;
    font-size: 1.4em;
    font-style: italic;
    justify-content: space-between;
    left: 0;
    top: 55px;
    padding: 5px 15px;
    position: absolute;
    overflow: hidden;
    width: 100%;
    animation: ${props => props.isOpen ? expand : collapse} 0.5s ease-in-out both;
`;

export default StyledHeader;