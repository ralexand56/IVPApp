import React, { StatelessComponent } from 'react';
import styled, { keyframes } from 'styled-components';
import actionCreators from '../../actions/ClientActions';
import { Icon } from 'antd';

interface Props {
    children?: React.ReactChild;
    className?: string;
    close: typeof actionCreators.setSearchResultsVisibility;
    header?: string;
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
    background: salmon;
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