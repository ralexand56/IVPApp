import React, { StatelessComponent } from 'react';
import styled from 'styled-components';
import { Icon, Tooltip } from 'antd';

interface Props {
    action?: Function;
    borderRadius?: number;
    className?: string;
    children?: React.ReactChild;
    hoverColor?: string;
    toolTip?: string;
    type?: string;
}

const Button: StatelessComponent<Props> = ({ 
    className, 
    children, 
    toolTip,
    type, 
    action }) => (
    <Tooltip title={toolTip || ''}>
        <button
            className={className}
            onClick={() => action}
        >
            {
                children
                    ? children
                    : type
                        ? <Icon type={type} />
                        : null
            }
        </button>
    </Tooltip>
);

const StyledButton = styled(Button) `
    background: transparent;
    border: 1px solid;
    border-radius: ${props => props.borderRadius || 3}px;
    transition: all 0.5s;
    &:hover {
        color: ${props => props.hoverColor || '#666'};
    }
`;

export default StyledButton;