import React, { StatelessComponent } from 'react';
import styled from '../../styled-components';
import { Avatar, Button, Dropdown, Icon, Input, Menu, Switch } from 'antd';
import actionCreators from '../../actions/ClientActions';
import { fadeIn } from '../../datatypes';
import { Client, User } from '../../datatypes';
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
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item>
                <Switch
                  onChange={e => setInteractive(e)}
                  checked={isInteractive}
                  checkedChildren="Interactive"
                  unCheckedChildren="Non-Interactive"
                />
              </Menu.Item>
            </Menu>
          }
        >
          <Button style={{ color: 'white' }} type="ghost">
            <Icon type="bars" />
          </Button>
        </Dropdown>
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
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item>
                  <Switch
                    onChange={e => setInteractive(e)}
                    checked={isInteractive}
                    checkedChildren="Interactive"
                    unCheckedChildren="Non-Interactive"
                  />
                </Menu.Item>
              </Menu>
            }
          >
            <Button style={{ color: 'white' }} type="ghost">
              <Icon type="bars" />
            </Button>
          </Dropdown>
        </SearchHeader>
      </DesktopHeader>
    </div>
  );
};

const StyledAppHeader = styled(AppHeader)`
  background: ${props => props.backgroundColor || 'gray'};
  color: white;
  display: flex;
  position: absolute;
  top: 0;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5em;
  font-style: normal;
  font-weight: normal;
  padding: 0.3em;
  width: 100%;
  z-index: 2;
  box-shadow: 0px 0px 10px #666;
  animation: ${fadeIn} 0.7s;
`;

export default StyledAppHeader;
