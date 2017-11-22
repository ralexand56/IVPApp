import React, { StatelessComponent } from 'react';
import styled from 'styled-components';

interface Props {
    className?: string;
    children?: React.ReactChild;
}

const Label: StatelessComponent<Props> = ({ className, children }) => (
    <div
        className={className}
    >
        {children}
    </div>
);

const StyledLabel = styled(Label) `
    
`;

export default StyledLabel;