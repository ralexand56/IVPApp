import React, { StatelessComponent } from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components';
import { theme } from '../datatypes';

const shadowIn = (props: { startColor: string, endColor: string }) => keyframes`
    0% {
        box-shadow: 0px 0px rgba(0,0,0,0.3);
        background: ${props.startColor};
    }
    75%{
        background: ${props.endColor};
        box-shadow: 0px 0px rgba(0,0,0,0.3);
    }
    100% {
        background: ${props.endColor};
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    }
`;

const shadowOut = (props: { startColor: string, endColor: string }) => keyframes`
     0% {
        background: ${props.endColor};
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    }
    25%{
        background: ${props.endColor};
        box-shadow: 0px 0px rgba(0,0,0,0.3);
    }
    100% {
        background: ${props.startColor};
        box-shadow: 0px 0px rgba(0,0,0,0.3);
    }
`;

const headerScaleIn = () => keyframes`
    0% {
        max-height: 0;
    }
    100% {
        max-height: 100%;
    }
`;

const headerScaleOut = () => keyframes`
    0% {
       max-height: 100%;
    }
    100% {
        max-height: 0;
    }
`;

interface Props {
    actions?: JSX.Element[] | undefined | React.ReactChild;
    className?: string;
    endColor?: string;
    header?: React.ReactChild;
    height?: string;
    isVisible?: boolean;
    close?: Function;
    margin?: string;
    headerStyle?: string;
    startColor?: string;
    children?: {};
    width?: string;
}

interface HeaderProps {
    className?: string;
}

interface PanelHeaderProps {
    className?: string;
    headerBackground?: string;
    isVisible?: boolean;
}

const Header: StatelessComponent<HeaderProps> = props => (
    <div className={props.className}>
        {props.children}
    </div>
);

const ActionHeader = styled.span`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const PanelHeader: StatelessComponent<PanelHeaderProps> = ({ className, children }) => (
    <span className={className}>
        {
            children
        }
    </span>
);

const StyledPanelHeader = styled(PanelHeader) `
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;    
    overflow: hidden;
    margin: 20px 0px 5px 0px;
    background: ${props => props.headerBackground || 'darkgray'};
    animation: ${props =>
        props.isVisible ? headerScaleIn : headerScaleOut} 0.5s ease-in-out both;
`;

const StyledHeader = styled(Header) `
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.2em;
    font-style: normal;
    font-weight: normal;
    padding: 3px;
`;

const BodyContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    overflow: hidden;
    animation: ${(props: { isVisible: Boolean }) =>
        props.isVisible ? headerScaleIn : headerScaleOut} 0.5s ease-in-out both;
`;

// const CloseButton = styled.div`
//     padding: 3px;
//     margin: 3px;
// `;

// const CloseIcon = styled(Icon) `
//     font-weight: bold;
//     font-size: 1em;
// `;

const RevealPanel: StatelessComponent<Props> = (props) => {
    const {
        actions,
        children,
        className,
        header,
        isVisible,
    } = props;

    return (
        <div
            className={className}
        >
            <StyledPanelHeader
                headerBackground={theme.headingBackground1}
                isVisible={isVisible || true}
            >
                {
                    header &&
                    <StyledHeader>
                        {header || 'Insert Heading'}
                    </StyledHeader>
                }
                {
                    actions &&
                    <ActionHeader>
                        {
                            actions
                        }
                    </ActionHeader>
                }

            </StyledPanelHeader>
            <BodyContainer
                isVisible={isVisible || true}
            >
                {
                    children
                }
            </BodyContainer>
        </div>
    );
};

const StyledRevealPanel = styled(RevealPanel) `
    margin: ${props => props.margin || '0px'};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    border-radius: 5px;
    border: 0px solid black;
    width: ${props => props.width || '100%'};
    height: ${props => props.height || '100%'};
    animation: ${props =>
        props.isVisible
            ? shadowIn({ startColor: props.startColor || 'white', endColor: props.endColor || 'white' })
            : shadowOut({ startColor: props.startColor || 'white', endColor: props.endColor || 'white' })} 
        0.5s ease-in-out both;
`;

export default StyledRevealPanel;