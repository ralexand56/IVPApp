import React, { StatelessComponent } from 'react';
import styled from 'styled-components';
import { Client, theme } from '../../datatypes';
import RevealPanel from '../RevealPanel';
import Radio from '../Radio';
import actionCreators from '../../actions/ClientActions';
import Admin from '../Admin';
import Comments from '../Comments';
import ClientBody from '../ClientBody';
import TagsView from '../TagsView';
import AddCommentMenu from '../AddCommentMenu';

const ClientViews = {
  1: <ClientBody />,
  2: <Comments />,
  5: <TagsView />,
  6: <Admin />,
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
  <RevealPanel
    className={className}
    endColor={theme.bodyBackground}
    header={
      <Radio
        label={`${currentClient.firstName} ${currentClient.lastName}`}
        labelColor="white"
        itemColor="white"
        activeColor="#ddd"
        items={[
          { name: 'Home', id: 1 },
          { name: 'Comments', id: 2 },
          { name: 'Tags', id: 5 },
          { name: 'Admin', id: 6 },
        ]}
        selectedPropsId={selectedClientTabId}
        onChange={(id: number) => setClientTab(id)}
        underlineColor={theme.headingBackground2}
        margin={0}
      />
    }
    actions={getActions(
      selectedClientTabId,
      currentClient,
    )}
    width="100%"
  >
    {selectedClientTabId ? ClientViews[selectedClientTabId] : <h4>Error!</h4>}
  </RevealPanel>
);

const StyledClientFooter = styled(ClientFooter)`
  display: flex;
  width: 100%;
  height: 100%;
  margin: 0px;
  border: 0px solid white;
`;

export default StyledClientFooter;

const getActions = (
  tabId: number,
  currentClient: Client,
) => {
  switch (tabId) {
    case 2:
      return (
       <AddCommentMenu />
      );

    default:
      return <span />;
  }
};