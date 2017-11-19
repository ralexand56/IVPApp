import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import Header from './Header';

const defaultStartColor: string = 'white';
const defaultEndColor: string = '#fff';
const defaultWidth: string = '20%';

const shadowIn = (props: Props) => keyframes`
0% {
    box-shadow: 0px 0px rgba(0,0,0,0.3);
    background: ${props.startColor || defaultStartColor};
    width: 0;
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
}

interface AppState {
    isOpen: boolean;
}

class SidePanel extends Component<Props, AppState> {

    constructor() {
        super();

        this.state = { isOpen: this.props.isOpen || true };
    }

    render() {
        return (
            <div
                className={this.props.className}
            >
                <Header isOpen={this.state.isOpen} />
                {this.props.children}
            </div>
        );
    }
}

const StyledSidePanel = styled(SidePanel) `
    border: 0px solid;
    height: 100%;
    overflow: hidden;
    padding: 50px 0 0 20px;
    position: absolute;
    right: 0;
    transition: all 0.7s ease-in-out;
    animation: ${props => props.isOpen ? shadowIn : shadowOut} 0.5s ease-in-out both;
`;

export default StyledSidePanel;