import React, { Component } from 'react';
import styled from 'styled-components';
import AppHeader from '../AppHeader';
import ClientList from '../ClientList';
import { Client, ClientType, State } from '../../datatypes';
import actionCreators from '../../actions/ClientActions';
// import { Affix, Switch } from 'antd';
import ClientMobileLayout from '../ClientMobileLayout';
import ClientDesktopLayout from '../ClientDesktopLayout';

interface Props {
  addClient: typeof actionCreators.addClient;
  className?: string;
  clientTypes: ClientType[];
  currentClient: Client | undefined;
  setCurrentClient: typeof actionCreators.setCurrentClient;
  setClientEditMode: typeof actionCreators.setClientEditMode;
  setInteractive: typeof actionCreators.setInteractive;
  isInEditMode: boolean;
  isInteractive: boolean;
  stateList: State[];
  updateClient: typeof actionCreators.updateClient;
}

export class App extends Component<Props, {}> {
  render() {
    const {
      addClient,
      clientTypes,
      className,
      currentClient,
      isInEditMode,
      isInteractive,
      setClientEditMode,
      setCurrentClient,
      stateList,
      updateClient,
    } = this.props;
    return (
      <div className={className}>
        <AppHeader />
        <ClientList />
        {currentClient &&
          !isInteractive && (
            <>
              <ClientDesktopLayout
                addClient={addClient}
                clientTypes={clientTypes}
                isInEditMode={isInEditMode}
                currentClient={currentClient}
                setClientEditMode={setClientEditMode}
                setCurrentClient={setCurrentClient}
                stateList={stateList}
                updateClient={updateClient}
              />
              <ClientMobileLayout currentClient={currentClient} />
            </>
            // <ClientInfo
            //   currentClient={currentClient}
            //   showClient={!isInteractive && currentClient !== undefined}
            //   setCurrentClient={setCurrentClient}
            // />
          )}
      </div>
    );
  }
}

// const InteractiveSwitch = (
//   isInteractive: boolean,
//   setInteractive: typeof actionCreators.setInteractive,
// ) => (
//   <Affix offsetBottom={0} style={{ position: 'absolute', left: 0 }}>
//     <Switch
//       onChange={e => setInteractive(e)}
//       checked={isInteractive}
//       checkedChildren="Interactive"
//       unCheckedChildren="Non-Interactive"
//     />
//   </Affix>
// );

const StyledApp = styled(App)`
  border: 0px solid red;
  height: 100%;
`;

        // {InteractiveSwitch(isInteractive, setInteractive)}
export default StyledApp;