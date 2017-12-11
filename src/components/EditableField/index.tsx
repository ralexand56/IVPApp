import React, { StatelessComponent } from 'react';
import styled from 'styled-components';
import { 
    fadeIn,
    theme,
 } from '../../datatypes';

interface Props {
    label?: string;
    labelColor?: string;
    className?: string;
    children?: React.ReactChild;
    inline?: boolean;
    isInEditMode?: boolean;
    txtValue?: string;
}

interface LabelProps {
    children?: string;
    className?: string;
    labelColor?: string;
}

const Label: StatelessComponent<LabelProps> = ({ className, children }) => (
    <div className={className}>
        {
            children
        }
    </div>
);

const StyledLabel = styled(Label) `
    border-right: 0px solid;
    color: ${props => props.labelColor 
        || theme.headingBackground2 
        || 'black'};
    padding: 0px 4px;
    font-style: normal;
    font-size: 0.9em;
    font-weight: normal;
`;

const Content = styled.span`
    font-size: 1.1em;
    padding: 0px 0px 0px 3px;
    font-weight: normal;
`;

const EditableField: StatelessComponent<Props> = ({
    isInEditMode,
    label,
    labelColor,
    className,
    children,
    txtValue,
 }) => (
        <div
            className={className}
        >
            <StyledLabel labelColor={labelColor}>
                {label || 'Label'}
            </StyledLabel>
            <Content>
                {
                    isInEditMode
                        ? children
                        : txtValue || ''
                }
            </Content>
        </div>
    );

const StyledEditableField = styled(EditableField) `
    display: flex;
    flex-direction: ${props => props.inline ? 'row' : 'column'};
    align-items: flex-start;
    animation: ${fadeIn} 0.7s ease-in-out both;
    margin: 15px 20px;
`;

export default StyledEditableField;