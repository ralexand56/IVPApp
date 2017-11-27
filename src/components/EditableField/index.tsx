import React, { StatelessComponent } from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../datatypes';
import { theme } from '../../datatypes';

interface Props {
    label?: string;
    className?: string;
    children?: React.ReactChild;
    isInEditMode?: boolean;
    txtValue?: string;
}

const Label = styled.span`
    border-right: 0px solid;
    color: ${theme.headingBackground2 
        ? theme.headingBackground2
        : 'black'};
    padding: 0px 4px;
    font-style: normal;
    font-size: 0.9em;
    font-weight: bold;
`;

const Content = styled.span`
    font-size: 1.2em;
    padding: 0px 0px 0px 3px;
    font-weight: normal;
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
    flex-direction: column;
    animation: ${fadeIn} 0.7s;
    margin: 15px 20px;
`;

export default StyledEditableField;