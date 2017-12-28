import React, { StatelessComponent } from 'react';
import styled from 'styled-components';
import { Client } from '../../datatypes';
import { Modal } from 'antd';
import actionCreators from '../../actions/ClientActions';

interface Props {
  currentClient: Client;
  isInEditMode?: boolean;
  showClient?: boolean;
  setCurrentClient: typeof actionCreators.setCurrentClient;
}

const ClientInfo: StatelessComponent<Props> = ({
  currentClient,
  setCurrentClient,
  showClient,
}) => (
  <Modal
    onOk={() => setCurrentClient(undefined)}
    onCancel={() => setCurrentClient(undefined)}
    title="Client"
    wrapClassName="vertical-center-modal"
    visible={showClient || false}
    maskClosable={true}
  >
    <p>{currentClient.firstName}</p>
    <p>{currentClient.lastName}</p>
  </Modal>
);

const StyledClientInfo = styled(ClientInfo)``;

export default StyledClientInfo;
