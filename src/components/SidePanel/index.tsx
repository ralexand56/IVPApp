import React, { StatelessComponent } from 'react';
import styled, { keyframes } from 'styled-components';
import Header from './Header';
import actionCreators from '../../actions/ClientActions';

const defaultStartColor: string = 'white';
const defaultEndColor: string = '#fff';
const defaultWidth: string = '20%';

const shadowIn = (props: Props) => keyframes`
0% {
    box-shadow: 0px 0px rgba(0,0,0,0.3);
    background: ${props.startColor || defaultStartColor};
    width: 0;
    padding: 0px;
}
25% {
    box-shadow: 0px 0px rgba(0,0,0,0.3);
    background: ${props.startColor || defaultStartColor};
}
85%{
    background: ${props.endColor || defaultEndColor};
    box-shadow: 0px 0px rgba(0,0,0,0.3);
}
100% {
    background: ${props.endColor || defaultEndColor};
    box-shadow: inset 5px 0px 15px rgba(0,0,0,0.3);
    width: ${props.width || defaultWidth};
}
`;

const shadowOut = (props: Props) => keyframes`
 0% {
    background: ${props.endColor || defaultEndColor};
    box-shadow: inset 5px 0px 15px rgba(0,0,0,0.3);
    width: ${props.width || defaultWidth};
}
25%{
    background: ${props.endColor || defaultStartColor};
    box-shadow: inset 5px 0px 15px rgba(0,0,0,0.3);
}
100% {
    background: ${props.startColor || defaultStartColor};
    box-shadow: 0px 0px rgba(0,0,0,0.3);
    width: 0px;
    padding: 0px;
}
`;

interface Props {
    className?: string;
    children?: React.ReactChild;
    isOpen?: boolean;
    header?: string;
    startColor?: string;
    endColor?: string;
    width?: string;
    toggle: typeof actionCreators.setSearchResultsVisibility;
}

const SidePanel: StatelessComponent<Props> = ({isOpen, className, children, toggle}) => {

    return (
        <div
            className={className}
        >
            <Header
                isOpen={isOpen}
                close={toggle}
            />
            {children}
        </div>
    );
};

const StyledSidePanel = styled(SidePanel) `
    border: 0px solid;
    height: 100%;
    overflow: hidden;
    padding: 50px 0 0 20px;
    position: absolute;
    z-index: 1;
    right: 0;
    transition: all 0.7s ease-in-out;
    animation: ${props => props.isOpen ? shadowIn : shadowOut} 0.5s ease-in-out both;
`;

export default StyledSidePanel;