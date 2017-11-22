import React, { StatelessComponent } from 'react';
import styled from 'styled-components';

interface Props {
    className?: string;
    children?: React.ReactChild;
}

const EditableField: StatelessComponent<Props> = ({ className, children }) => (
    <div
        className={className}
    >
        {children}
    </div>
);

const StyledEditableField = styled(EditableField) `
    display: flex;
`;

export default StyledEditableField;