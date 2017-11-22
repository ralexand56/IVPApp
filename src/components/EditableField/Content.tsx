import React, { StatelessComponent } from 'react';
import styled from 'styled-components';

interface Props {
    className?: string;
    children?: React.ReactChild;
}

const Content: StatelessComponent<Props> = ({ className, children }) => (
    <div
        className={className}
    >
        {children}
    </div>
);

const StyledContent = styled(Content) `
    
`;

export default StyledContent;