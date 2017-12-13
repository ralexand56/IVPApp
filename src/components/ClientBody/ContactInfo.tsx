import React, { StatelessComponent } from 'react';
import styled from 'styled-components';
import EditableField from '../EditableField';
import RevealPanel from '../RevealPanel';
import { Input } from 'antd';
import { Client, theme } from '../../datatypes';
import actionCreators from '../../actions/ClientActions';

interface Props {
  className?: string;
  currentClient: Client;
  isInEditMode: boolean;
  updateClient: typeof actionCreators.updateClient;
}

const ContactInfo: StatelessComponent<Props> = ({className, currentClient, isInEditMode, updateClient}) => (
  <RevealPanel
    className={className}  
    header="Contact Info"
    endColor={theme.bodyBackground}
    height="auto"
    isVisible={true}
  >
    <EditableField
      label="Title"
      txtValue={currentClient.title}
      isInEditMode={isInEditMode}
      inline={true}
    >
      <Input
        onChange={e =>
          updateClient({ ...currentClient, title: e.currentTarget.value })
        }
        value={currentClient.title}
      />
    </EditableField>
    <EditableField
      label="Company"
      txtValue={currentClient.company}
      isInEditMode={isInEditMode}
      inline={true}
    >
      <Input
        onChange={e =>
          updateClient({ ...currentClient, company: e.currentTarget.value })
        }
        value={currentClient.company}
      />
    </EditableField>
    <EditableField
      label="Phone"
      txtValue={currentClient.phone}
      isInEditMode={isInEditMode}
      inline={true}
    >
      <Input
        onChange={e =>
          updateClient({
            ...currentClient,
            phone: formatPhone(e.currentTarget.value),
          })
        }
        value={currentClient.phone}
      />
    </EditableField>
    <EditableField
      label="Email"
      txtValue={currentClient.email}
      isInEditMode={isInEditMode}
      inline={true}
    >
      <Input
        onChange={e =>
          updateClient({ ...currentClient, email: e.currentTarget.value })
        }
        value={currentClient.email}
      />
    </EditableField>
    <EditableField
      label="Website"
      txtValue={currentClient.website}
      isInEditMode={isInEditMode}
      inline={true}
    >
      <Input
        onChange={e =>
          updateClient({ ...currentClient, website: e.currentTarget.value })
        }
        value={currentClient.website}
      />
    </EditableField>
  </RevealPanel>
);

const StyledContactInfo = styled(ContactInfo) `
  width: 100%;
  margin: 1em;
`;

export default StyledContactInfo;

const formatPhone = (phonenum: string) => {
  var regexObj = /^(?:\+?1[-. ]?)?(?:\(?([0-9]{3})\)?[-. ]?)?([0-9]{3})[-. ]?([0-9]{4})$/;
  if (regexObj.test(phonenum)) {
    let parts = phonenum.match(regexObj);
    let phone = '';
    if (parts && parts[1]) {
      phone += '+1 (' + parts[1] + ') ';
    }
    if (parts) {
      phone += parts[2] + '-' + parts[3];
    }
    return phone;
  } else {
    // invalid phone number
    return phonenum;
  }
};