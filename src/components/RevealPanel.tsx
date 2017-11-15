import React from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components';
import {
    Icon,
} from 'antd';

const shadowIn = (props: {startColor: string, endColor: string}) => keyframes`
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
    endColor?: string;
    heading: string;
    isVisible: boolean;
    close: Function;
    startColor?: string;
    children?: JSX.Element;
}

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 320px;
    height: 250px;
    border-radius: 5px;
    animation: ${(props: { isVisible: Boolean, endColor: string, startColor: string }) =>
        props.isVisible ? shadowIn : shadowOut} 0.5s ease-in-out both;
`;

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.4em;
    padding-left: 10px;
    overflow: hidden;
    margin: 10px 0px 5px 0px;
    animation: ${(props: { isVisible: Boolean }) =>
        props.isVisible ? headerScaleIn : headerScaleOut} 0.5s ease-in-out both;
`;

const BodyContainer = styled.div`
    width: 100%;
    margin: 5px;
    overflow: hidden;
    animation: ${(props: { isVisible: Boolean }) =>
        props.isVisible ? headerScaleIn : headerScaleOut} 0.5s ease-in-out both;
`;

const CloseButton = styled.div`
    padding: 3px;
    margin: 3px;
`;

const CloseIcon = styled(Icon) `
    font-weight: bold;
    font-size: 1em;
`;

export const RevealPanel = (props: Props) => {
    const {
        children,
        endColor,
        heading,
        isVisible,
        close,
        startColor,
    } = props;
    const start = startColor || 'white';
    const end = endColor || 'white';

    return (
        <MainContainer
            endColor={end}
            isVisible={isVisible}
            startColor={start}
        >
            <HeaderContainer
                isVisible={isVisible}
            >
                {heading}
                <CloseButton onClick={() => close()}>
                    <CloseIcon
                        type="close"
                    />
                </CloseButton>
            </HeaderContainer>
            <BodyContainer
                isVisible={isVisible}
            >
                {
                    children
                }
            </BodyContainer>
        </MainContainer>
    );
};

export default RevealPanel;