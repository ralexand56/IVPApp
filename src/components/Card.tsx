import * as React from 'react';
import styled from 'styled-components';

const FlexBox = styled.div`
    display: flex;
`;

interface Props {
    sideBar: JSX.Element;
}

export const Card = ({sideBar}: Props) =>
    <FlexBox>{Array.isArray(sideBar) ? sideBar : sideBar}</FlexBox>;