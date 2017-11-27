import React, { StatelessComponent } from 'react';
import styled from 'styled-components';
import { Icon, Tooltip } from 'antd';
import { theme } from '../datatypes';

interface Props {
    borderRadius?: number;
    className?: string;
    children?: React.ReactChild;
    disabled?: boolean;
    hoverColor?: string;
    margin?: number;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    toolTip?: string;
    type?: string;
}

const Button: StatelessComponent<Props> = ({
    className,
    children,
    disabled,
    onClick,
    toolTip,
    type }) => (
        <Tooltip title={toolTip || ''}>
            <button
                disabled={disabled || false}
                className={className}
                onClick={onClick || onClick}
            >
                {
                    children
                        ? children
                        : <Icon
                            className={className}
                            type={type || 'plus'}
                        />
                }
            </button>
        </Tooltip>
    );

const StyledButton = styled(Button) `
    background: transparent;
    border: 0px solid;
    border-radius: ${props => props.borderRadius || 0}px;
    cursor: pointer;
    font-weight: bold;
    margin: ${props => props.margin || 3}px;
    transition: all 0.5s;
    &:disabled {
        background: transparent;
        border: 1px solid;
    }
    &:hover {
        color: ${props => theme.bodyForeground
                ? theme.bodyForeground
                : 'white'};
    }

`;

export default StyledButton;