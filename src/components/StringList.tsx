import React, { StatelessComponent } from 'react';
import styled from '../styled-components';
import ThemeInterface from '../theme';

interface Props {
  className?: string;
  children?: React.ReactChild;
  theme?: ThemeInterface;
  label?: string;
  list?: string[];
  linkList?: JSX.Element[];
  margin?: string;
}

const StringList: StatelessComponent<Props> = ({
  className,
  label,
  linkList,
  list
}) => (
  <div className={className}>
    <h5>{label || 'List'}</h5>
    {list && (
      <ListContainer>{list.map((x, i) => <li key={i}>{x}</li>)}</ListContainer>
    )}
    {linkList && (
      <ListContainer>
        {linkList.map((x, i) => <li key={i}>{x}</li>)}
      </ListContainer>
    )}
  </div>
);

const ListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  list-style: none;
  padding-left: 10px;
  font-size: 0.8em;
`;

const StyledStringList = styled(StringList)`
  display: flex;
  margin: ${props => props.margin || '0.5em'};
  > h5 {
    font-size: 0.7em;
    font-weight: normal;
    color: ${props => props.theme.headingBackground2 || 'black'};
    text-transform: uppercase;
  }
`;

export default StyledStringList;
