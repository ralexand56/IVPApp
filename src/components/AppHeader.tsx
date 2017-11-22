import React, { StatelessComponent } from 'react';
import styled from '../styled-components';
import {
    Icon,
} from 'antd';
import actionCreators from '../actions/ClientActions';
// import ThemeInterface from '../theme';

const LogoHeader = styled.span`
    margin-left: 10px;
`;

const ExportReportButton = styled(Icon) `
    margin-right: 10px;
`;

interface Props {
    backgroundColor?: string;
    className?: string;
    foregroundColor?: string;
    extractPanelIsShowing: boolean;
    setPanelVisibility: typeof actionCreators.setSearchResultsVisibility;
}

const AppHeader: StatelessComponent<Props> = ({
    backgroundColor,
    className,
    extractPanelIsShowing,
    setPanelVisibility, }: Props) => {
    return (
        <div className={className}>
            <LogoHeader><Icon type="idcard" style={{ padding: 10 }} />IVP Manager</LogoHeader>

            <ExportReportButton
                type="cloud-download-o"
                onClick={() => setPanelVisibility(!extractPanelIsShowing)}
            />
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
  font-style: italic;
  width: 100%;
  z-index: 2;
  box-shadow: 0px 0px 10px #666;
`;

export default StyledAppHeader;