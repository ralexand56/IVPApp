import React, { StatelessComponent } from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../datatypes';

interface Props {
    label?: string;
    className?: string;
    children?: React.ReactChild;
    isInEditMode?: boolean;
    txtValue?: string;
}

const Label = styled.span`
    border-right: 2px solid;
    color: #666;
    padding: 0px 4px;
    font-style: italic;
    font-size: 1.2em;
    font-weight: bold;
`;

const Content = styled.span`
    font-size: 1.2em;
    padding: 0px 0px 0px 3px;
    font-weight: bold;
`;

const EditableField: StatelessComponent<Props> = ({
    isInEditMode,
    label,
    className,
    children,
    txtValue,
 }) => (
        <div
            className={className}
        >
            <Label>
                {label || 'Label'}
            </Label>
            <Content>
                {
                    isInEditMode
                        ? children
                        : txtValue || 'Insert Value'
                }
            </Content>
        </div>
    );

const StyledEditableField = styled(EditableField) `
    display: flex;
    animation: ${fadeIn} 0.7s;
`;

export default StyledEditableField;