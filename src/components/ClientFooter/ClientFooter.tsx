import React, { StatelessComponent } from 'react';
import styled from 'styled-components';
import {
    Client,
    theme,
} from '../../datatypes';
import { 
    Icon,
    Input,
 } from 'antd';
import RevealPanel
    from '../RevealPanel';
import Radio from '../Radio';
import actionCreators from '../../actions/ClientActions';
import Comments from '../Comments';

const ClientViews = {
    1: <Comments />,
};

interface Props {
    className?: string;
    children?: React.ReactChild;
    currentClient: Client;
    selectedClientTabId: number;
    setClientTab: typeof actionCreators.setClientTab;
}

const ClientFooter: StatelessComponent<Props> = ({
    className,
    children,
    currentClient,
    selectedClientTabId,
    setClientTab,
 }) => (
        <div className={className}>
            <RevealPanel
                header={
                    <Radio
                        label="Lists"
                        labelColor="white"
                        itemColor="white"
                        activeColor="#ddd"
                        items={[
                            { name: 'Comments', id: 1 },
                            { name: 'Interactions', id: 2 },
                            { name: 'Sample Assets', id: 3 },
                            { name: 'Tags', id: 4 },
                        ]}
                        selectedPropsId={selectedClientTabId}
                        onChange={(id: number) => setClientTab(id)}
                        underlineColor={theme.headingBackground2}
                        margin={0}
                    />
                }
                actions={
                    getActions(selectedClientTabId)
                }
                width="100%"
            >
                {
                    ClientViews[selectedClientTabId]
                }
            </RevealPanel>
        </div>
    );

const StyledClientFooter = styled(ClientFooter) `
    display: flex;
    flex: 1;
    height: 100%;
    margin: 5px;
    border: 0px solid white;
`;

export default StyledClientFooter;

const getActions = (tabId: number) => {
    switch (tabId) {
        case 1:
            return (
                <Input
                    placeholder="add comment..."
                    addonAfter={<Icon type="plus" />}
                />);

        default:
            return <span />;
    }
};