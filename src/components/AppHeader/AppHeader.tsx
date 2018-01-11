import React, { StatelessComponent } from 'react';
import styled from '../../styled-components';
import { Affix, Avatar, Input } from 'antd';
import actionCreators from '../../actions/ClientActions';
import { Client, User } from '../../datatypes';
import SlidingPanel from '../SlidingPanel';
// import ThemeInterface from '../theme';

const Header = styled.span`
  display: none;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border: 0px solid;

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
  backgroundColor?: string;
  currentUser?: User;
  className?: string;
  foregroundColor?: string;
  isInteractive: boolean;
  message: string;
  extractPanelIsShowing: boolean;
  searchClients: typeof actionCreators.searchClients;
  setInteractive: typeof actionCreators.setInteractive;
  setPanelVisibility: typeof actionCreators.setSearchResultsVisibility;
}

const AppHeader: StatelessComponent<Props> = ({
  backgroundColor,
  className,
  clients,
  currentUser,
  extractPanelIsShowing,
  isInteractive,
  message,
  searchClients,
  setPanelVisibility,
  setInteractive,
}: Props) => {
  return (
    <Affix>
      <SlidingPanel isOpen={true}>
        <div className={className}>
          <Header>
            <img
              src="./images/logo.png"
              width="50"
              height="46"
              style={{ padding: 10 }}
            />
            <Search
              placeholder="search..."
              onSearch={(value: string) => searchClients(value, clients)}
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
              <Search
                placeholder="search..."
                onSearch={(value: string) => searchClients(value, clients)}
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
      </SlidingPanel>
    </Affix>
  );
};

const StyledAppHeader = styled(AppHeader)`
  background: ${props => props.backgroundColor || 'gray'};
  color: white;
  display: flex;
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
