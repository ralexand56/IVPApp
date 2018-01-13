import React, { StatelessComponent } from 'react';
import styled from 'styled-components';

interface Props {
  align?: string;
  className?: string;
  children?:
    | React.ReactChild
    | (Element | string)[]
    | React.ReactElement<{}>
    | JSX.Element[]
    | undefined
    | (React.ReactElement<{}> | number | string | JSX.Element | null | undefined)[]
    | JSX.Element;
  justify?: string;
  margin?: string;
}

const HorizontalLayout: StatelessComponent<Props> = ({
  className,
  children,
}) => <div className={className}>{children}</div>;

const StyledHorizontalLayout = styled(HorizontalLayout)`
  display: flex;
  align-items: ${props => props.align || 'center'};
  justify-content: ${props => props.justify || 'flex-start'};
  margin: ${props => props.margin || '0px'};
`;

export default StyledHorizontalLayout;
