import React, { StatelessComponent } from 'react';
import styled from '../../styled-components';
import {
    Avatar,
    Input,
} from 'antd';
import actionCreators from '../../actions/ClientActions';
import { fadeIn } from '../../datatypes';
import {
    Client,
    User
} from '../../datatypes';
// import ThemeInterface from '../theme';

const LogoHeader = styled.span`
    display: flex;
    align-items: center;
    margin-left: 10px;
`;

const Search = Input.Search;

interface Props {
    clients: Client[];
    backgroundColor?: string;
    currentUser?: User;
    className?: string;
    foregroundColor?: string;
    message: string;
    extractPanelIsShowing: boolean;
    searchClients: typeof actionCreators.searchClients;
    setPanelVisibility: typeof actionCreators.setSearchResultsVisibility;
}

const AppHeader: StatelessComponent<Props> = ({
    backgroundColor,
    className,
    clients,
    currentUser,
    extractPanelIsShowing,
    message,
    searchClients,
    setPanelVisibility, }: Props) => {
    return (
        <div className={className}>
            <LogoHeader>
                <img
                    src="./images/logo.png"
                    width="50"
                    height="46"
                    style={{ padding: 10 }}
                />
                IVP Public Art Client Manager
            </LogoHeader>

            <div style={{display: 'flex'}}>
                <span style={{margin: 10}}>{message}</span>
                <Search
                    placeholder="search..."
                    style={{ width: 445, margin: 10 }}
                    onSearch={(value: string) => searchClients(value, clients)}
                />
                {
                    currentUser &&
                    <Avatar
                        style={{margin: 5}}
                        src={`./images/${currentUser.imgSrc}` || ''}
                    />
                }
            </div>
        </div>
    );
};

const StyledAppHeader = styled(AppHeader) `
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
  width: 100%;
  z-index: 2;
  box-shadow: 0px 0px 10px #666;
  animation: ${fadeIn} 0.7s;
`;

export default StyledAppHeader;