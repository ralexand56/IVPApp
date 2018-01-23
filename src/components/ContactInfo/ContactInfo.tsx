import React, { StatelessComponent } from 'react';
import styled from '../../styled-components';
import { Client } from '../../datatypes';
import EditableField from '../EditableField';
import { Input } from 'antd';
import actionCreators from '../../actions/ClientActions';
// import HorizontalPanel from '../HorizontalLayout';
import StringList from '../StringList';
import SlidingPanel from '../SlidingPanel';
import ThemeInterface from '../../theme';
import { formatPhone } from '../../datatypes';

interface Props {
  className?: string;
  children?: React.ReactChild;
  theme?: ThemeInterface;
  isInEditMode: boolean;
  currentClient: Client;
  setClientEditMode: typeof actionCreators.setClientEditMode;
  updateClient: typeof actionCreators.updateClient;
}

const ContactInfo: StatelessComponent<Props> = ({
  className,
  currentClient,
  isInEditMode,
  updateClient
}) => (
  <SlidingPanel title="Contact Info">
    <div className={className}>
      <EditableField
        label="Phone"
        txtValue={currentClient.phone}
        isInEditMode={isInEditMode}
        inline={true}
      >
        <Input
          size="small"
          onChange={e =>
            updateClient({
              ...currentClient,
              phone: formatPhone(e.currentTarget.value)
            })
          }
          value={currentClient.phone}
        />
      </EditableField>
      <EditableField
        label="Fax"
        txtValue={currentClient.fax}
        isInEditMode={isInEditMode}
        inline={true}
      >
        <Input
          size="small"
          onChange={e =>
            updateClient({
              ...currentClient,
              fax: formatPhone(e.currentTarget.value)
            })
          }
          value={currentClient.fax}
        />
      </EditableField>
      <StringList
        label="Emails (2)"
        linkList={[
          <a key={1} href="mailto:ralexand56@live.com">
            {'douga@live.com'}
          </a>,
          <a key={2} href="mailto:ralexand56@live.com">
            {'dougie@informars.com'}
          </a>
        ]}
      />
      <StringList
        label="Links (2)"
        linkList={[
          <a key={1} href="http://www.google.com">
            {'http://www.google.com'}
          </a>,
          <a key={2} href="http://www.cnet.com" target="_blank">
            {'http://www.cnet.com'}
          </a>
        ]}
      />
    </div>
  </SlidingPanel>
);

const StyledContactInfo = styled(ContactInfo)``;

export default StyledContactInfo;
