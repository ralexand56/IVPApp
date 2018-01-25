import React, { StatelessComponent } from 'react';
import styled from '../../styled-components';
import { Client, TagItem } from '../../datatypes';
import EditableField from '../EditableField';
import { Input, Popconfirm, Button, Icon } from 'antd';
import actionCreators from '../../actions/ClientActions';
import StringList from '../StringList';
import SlidingPanel from '../SlidingPanel';
import ThemeInterface from '../../theme';
import { formatPhone } from '../../datatypes';
import AddEmail from './AddEmail';
import AddLink from './AddLink';
import AffliateInfo from './AffliateInfo';

interface Props {
  affiliations: TagItem[];
  addAffiliation: typeof actionCreators.addAffiliation;
  addAffiliationToClient: typeof actionCreators.addAffiliationToClient;
  addEmail: typeof actionCreators.addEmail;
  addLink: typeof actionCreators.addWebsite;
  className?: string;
  children?: React.ReactChild;
  deleteEmail: typeof actionCreators.deleteEmail;
  deleteLink: typeof actionCreators.deleteLink;
  theme?: ThemeInterface;
  isInEditMode: boolean;
  currentClient: Client;
  setClientAffiliations: typeof actionCreators.setClientAffiliations;
  setClientEditMode: typeof actionCreators.setClientEditMode;
  updateClient: typeof actionCreators.updateClient;
}

const ContactInfo: StatelessComponent<Props> = ({
  addAffiliation,
  addAffiliationToClient,
  affiliations,
  addEmail,
  addLink,
  className,
  currentClient,
  deleteEmail,
  deleteLink,
  isInEditMode,
  setClientAffiliations,
  theme,
  updateClient,
}) => (
  <SlidingPanel title="Contact Info">
    <div className={className}>
      <div style={{ flex: 1 }}>
        {' '}
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
                phone: formatPhone(e.currentTarget.value),
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
                fax: formatPhone(e.currentTarget.value),
              })
            }
            value={currentClient.fax}
          />
        </EditableField>
        {isInEditMode && (
          <AddEmail
            addEmail={addEmail}
            isInEditMode={isInEditMode}
            currentClient={currentClient}
          />
        )}
        <StringList
          label={`Emails (${
            currentClient.emails ? currentClient.emails.length : 0
          })`}
          linkList={
            currentClient.emails
              ? currentClient.emails.map(x => (
                  <span key={x.id}>
                    <a key={x.id} href={`mailto:${x.name}`}>
                      {x.alias}
                    </a>
                    {isInEditMode && (
                      <Popconfirm
                        placement="top"
                        title="Are you sure you want to delete the email link?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() =>
                          x.id && deleteEmail(x.id, currentClient)
                        }
                      >
                        <Button
                          size="small"
                          ghost={true}
                          style={{
                            margin: 5,
                          }}
                          type="primary"
                        >
                          <Icon type="minus" />
                        </Button>
                      </Popconfirm>
                    )}
                  </span>
                ))
              : []
          }
        />
        {isInEditMode && (
          <AddLink
            addLink={addLink}
            isInEditMode={isInEditMode}
            currentClient={currentClient}
          />
        )}
        <StringList
          label={`Links (${
            currentClient.websites ? currentClient.websites.length : 0
          })`}
          linkList={
            currentClient.websites
              ? currentClient.websites.map(x => (
                  <span key={x.id}>
                    <a key={x.id} href={x.name} target="_blank">
                      {x.alias}
                    </a>
                    {isInEditMode && (
                      <Popconfirm
                        placement="top"
                        title="Are you sure you want to delete the link?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() =>
                          x.id && deleteLink(x.id, currentClient)
                        }
                      >
                        <Button
                          size="small"
                          ghost={true}
                          style={{
                            margin: 5,
                          }}
                          type="primary"
                        >
                          <Icon type="minus" />
                        </Button>
                      </Popconfirm>
                    )}
                  </span>
                ))
              : []
          }
        />
      </div>
      <div style={{ flex: 1 }}>
        <AffliateInfo
          addAffiliation={addAffiliation}
          addAffiliationToClient={addAffiliationToClient}
          affiliations={affiliations}
          currentClient={currentClient}
          isInEditMode={isInEditMode}
          setClientAffiliations={setClientAffiliations}
        />
      </div>
    </div>
  </SlidingPanel>
);

const StyledContactInfo = styled(ContactInfo)`
  display: flex;
  width: 100%;
  color: ${props => props.theme.headingBackground2 || 'black'};
  font-size: 0.9em;
`;

export default StyledContactInfo;
