import React, { StatelessComponent } from 'react';
import styled from 'styled-components';

interface Props {
    className?: string;
    children?: React.ReactChild | JSX.Element[] | undefined | (string | JSX.Element)[];
}

const HorizontalLayout: StatelessComponent<Props> = ({ className, children }) => (
    <div className={className}>
        {
            children
        }
    </div>
);

const StyledHorizontalLayout = styled(HorizontalLayout) `
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px;
`;

export default StyledHorizontalLayout;