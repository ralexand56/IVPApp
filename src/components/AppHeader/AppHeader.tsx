import React, { StatelessComponent } from 'react';
import styled from '../../styled-components';
import { Avatar, Input, Button, Icon } from 'antd';
import actionCreators from '../../actions/ClientActions';
import { Client, User, ClientType } from '../../datatypes';
// import SlidingPanel from '../SlidingPanel';
// import ThemeInterface from '../theme';

const Header = styled.span`
  display: none;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border: 1px solid;

  @media (max-width: 700px) {
    display: flex;
  }
`;

const DesktopHeader = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 0px solid;
  width: 100%;

  @media (max-width: 700px) {
    display: none;
  }
`;

const SearchHeader = styled.span`
  display: flex;
  align-items: center;
`;

const LogoHeader = styled.span`
  display: flex;
  align-items: center;
`;

const Search = Input.Search;

interface Props {
  clients: Client[];
  clientTypes: ClientType[];
  backgroundColor?: string;
  currentUser?: User;
  className?: string;
  filteredClients: Client[];
  foregroundColor?: string;
  isInteractive: boolean;
  message: string;
  searchResultsIsVisible: boolean;
  addClient: () => void;
  searchClients: typeof actionCreators.searchClients;
  setInteractive: typeof actionCreators.setInteractive;
  setSearchResultsVisibility: typeof actionCreators.setSearchResultsVisibility;
}

const AppHeader: StatelessComponent<Props> = ({
  addClient,
  backgroundColor,
  className,
  clients,
  clientTypes,
  currentUser,
  searchResultsIsVisible,
  filteredClients,
  isInteractive,
  message,
  searchClients,
  setSearchResultsVisibility,
  setInteractive
}: Props) => {
  return (
    <div className={className}>
      <Header>
        <img
          src="./images/logo.png"
          width="50"
          height="46"
          style={{ padding: 10 }}
        />
        <span style={{ fontSize: '0.7em', margin: 5, fontStyle: 'italic' }}>
          Search results({filteredClients.length})
        </span>
        <Search
          placeholder="search..."
          onSearch={(value: string) =>
            searchClients(value, clients, clientTypes)
          }
          style={{ flex: 1 }}
        />
        {currentUser && (
          <Avatar
            style={{ margin: 5 }}
            src={`./images/${currentUser.imgSrc}` || ''}
          />
        )}
      </Header>
      <DesktopHeader>
        <LogoHeader>
          <img
            src="./images/logo.png"
            width="50"
            height="46"
            style={{ padding: 10 }}
          />
          IVP Public Art Client Manager
        </LogoHeader>
        <SearchHeader>
        <Button ghost={true} onClick={() => addClient()}>
          <Icon type="plus" />
        </Button>
          <span style={{ fontSize: '0.7em', margin: 5, fontStyle: 'italic' }}>
            Clients({filteredClients.length})
          </span>
          <Search
            placeholder="search..."
            onSearch={(value: string) =>
              searchClients(value, clients, clientTypes)
            }
          />
          {currentUser && (
            <Avatar
              style={{ margin: 5 }}
              src={`./images/${currentUser.imgSrc}` || ''}
            />
          )}
        </SearchHeader>
      </DesktopHeader>
    </div>
  );
};

const StyledAppHeader = styled(AppHeader)`
  background: ${props => props.theme.headingBackground1 || 'gray'};
  color: white;
  border: 0px solid red;
  display: flex;
  position: absolute;
  top: 0;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5em;
  font-style: normal;
  font-weight: normal;
  padding: 0.3em;
  width: 100%;
  box-shadow: 0px 0px 10px #666;
`;

export default StyledAppHeader;
