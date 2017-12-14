import React, { StatelessComponent } from 'react';
import styled from 'styled-components';
import EditableField from '../EditableField';
import RevealPanel from '../RevealPanel';
import { Input } from 'antd';
import { Client, theme } from '../../datatypes';
import HorizontalLayout from '../HorizontalLayout';
import actionCreators from '../../actions/ClientActions';

interface Props {
  className?: string;
  currentClient: Client;
  isInEditMode: boolean;
  setClientEditMode: typeof actionCreators.setClientEditMode;
  updateClient: typeof actionCreators.updateClient;
}

const Address: StatelessComponent<Props> = ({
  className,
  currentClient,
  isInEditMode,
  setClientEditMode,
  updateClient,
}) => (
  <RevealPanel
    className={className}
    header="Address"
    endColor={theme.bodyBackground}
    height="auto"
    isVisible={true}
  >
    <EditableField
      label="Address 1"
      txtValue={currentClient.address1}
      click={() => setClientEditMode(true)}
      isInEditMode={isInEditMode}
      inline={true}
    >
      <Input
        onChange={e =>
          updateClient({
            ...currentClient,
            address1: e.currentTarget.value,
          })
        }
        value={currentClient.address1}
      />
    </EditableField>
    <EditableField
      label="Address 2"
      click={() => setClientEditMode(true)}
      txtValue={currentClient.address2}
      isInEditMode={isInEditMode}
      inline={true}
    >
      <Input
        onChange={e =>
          updateClient({
            ...currentClient,
            address2: e.currentTarget.value,
          })
        }
        value={currentClient.address2}
      />
    </EditableField>
    <HorizontalLayout>
      <EditableField
        label="City"
        txtValue={currentClient.city}
        isInEditMode={isInEditMode}
        click={() => setClientEditMode(true)}
        inline={true}
      >
        <Input
          onChange={e =>
            updateClient({ ...currentClient, city: e.currentTarget.value })
          }
          value={currentClient.city}
        />
      </EditableField>
      <EditableField
        label="State"
        txtValue={currentClient.state}
        isInEditMode={isInEditMode}
        inline={true}
      >
        <Input
          onChange={e =>
            updateClient({ ...currentClient, state: e.currentTarget.value })
          }
          value={currentClient.state}
        />
      </EditableField>
    </HorizontalLayout>
    <HorizontalLayout>
      <EditableField
        label="Zip"
        txtValue={currentClient.zip}
        isInEditMode={isInEditMode}
        inline={true}
        click={() => setClientEditMode(true)}
      >
        <Input
          onChange={e =>
            updateClient({ ...currentClient, zip: e.currentTarget.value })
          }
          value={currentClient.zip}
        />
      </EditableField>
      <EditableField
        label="Country"
        txtValue={currentClient.country}
        isInEditMode={isInEditMode}
        inline={true}
        click={() => setClientEditMode(true)}
      >
        <Input
          onChange={e =>
            updateClient({ ...currentClient, country: e.currentTarget.value })
          }
          value={currentClient.country}
        />
      </EditableField>
    </HorizontalLayout>
  </RevealPanel>
);

const StyledAddress = styled(Address)`
  margin: 1em;
`;

export default StyledAddress;
