import React, { StatelessComponent } from 'react';
import styled from 'styled-components';
import { fadeIn, theme } from '../../datatypes';
const processString = require('react-process-string');

interface Props {
  label?: string;
  labelColor?: string;
  className?: string;
  children?: React.ReactChild;
  inline?: boolean;
  isInEditMode?: boolean;
  click?: Function;
  txtValue?: string;
}

interface LabelProps {
  children?: string;
  className?: string;
  labelColor?: string;
}

const Label: StatelessComponent<LabelProps> = ({ className, children }) => (
  <div className={className}>{children}</div>
);

const StyledLabel = styled(Label)`
  border-right: 0px solid;
  color: ${props => props.labelColor || theme.headingBackground2 || 'black'};
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
  click,
  txtValue,
}) => (
  <div className={className} onClick={() => click && click(true)}>
    <StyledLabel labelColor={labelColor}>{label || ''}</StyledLabel>
    <Content>
      {isInEditMode ? children : processString(config)(txtValue) || ''}
    </Content>
  </div>
);

const StyledEditableField = styled(EditableField)`
  display: flex;
  flex-direction: ${props => (props.inline ? 'row' : 'column')};
  align-items: flex-start;
  animation: ${fadeIn} 0.7s ease-in-out both;
  margin: 3px 4px;
  font-size: 0.8em;
`;

export default StyledEditableField;

const config = [
  {
    regex: /(http|https):\/\/(\S+)\.([a-z]{2,}?)(.*?)( |\,|$|\.)/gim,
    fn: (key: string, result: string) => (
      <span key={key}>
        <a
          target="_blank"
          href={`${result[1]}://${result[2]}.${result[3]}${result[4]}`}
        >
          {result[2]}.{result[3]}
          {result[4]}
        </a>
        {result[5]}
      </span>
    ),
  },
  {
    regex: /(\S+)\.([a-z]{2,}?)(.*?)( |\,|$|\.)/gim,
    fn: (key: string, result: string) => (
      <span key={key}>
        <a
          target="_blank"
          href={`http://${result[1]}.${result[2]}${result[3]}`}
        >
          {result[1]}.{result[2]}
          {result[3]}
        </a>
        {result[4]}
      </span>
    ),
  },
];
