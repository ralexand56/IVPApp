import React, { StatelessComponent } from 'react';
import styled from 'styled-components';
import { Client, ClientType, storage, theme } from '../../datatypes';
import RevealPanel from '../RevealPanel';
import { Avatar, Button, Icon, message, Upload } from 'antd';
import HorizontalLayout from '../HorizontalLayout';
import actionCreators from '../../actions/ClientActions';
import Header from './Header';
import Notes from './Notes';
import Address from './Address';
import ContactInfo from './ContactInfo';

interface Props {
  className?: string;
  children?: React.ReactChild;
  clientTypes: ClientType[];
  currentClient: Client;
  isInEditMode?: boolean;
  setClientEditMode: typeof actionCreators.setClientEditMode;
  updateClient: typeof actionCreators.updateClient;
}

const ClientBody: StatelessComponent<Props> = ({
  className,
  clientTypes,
  children,
  currentClient,
  isInEditMode,
  setClientEditMode,
  updateClient,
}) => (
  <RevealPanel
    className={className}
    endColor={theme.bodyBackground}
    header={
      <Header
        clientTypes={clientTypes}
        currentClient={currentClient}
        isInEditMode={isInEditMode || false}
        updateClient={updateClient}
      />
    }
    actions={
      <>
        <Button
          style={{ margin: 5 }}
          size="small"
          ghost={true}
          onClick={() =>
            updateClient({ ...currentClient, isActive: false }, true)
          }
        >
          <Icon type="delete" />
        </Button>
        <Button
          style={{ margin: 5 }}
          size="small"
          ghost={true}
          onClick={() => setClientEditMode(!isInEditMode)}
        >
          <Icon type="edit" />
        </Button>
        {isInEditMode ? (
          <Upload
            beforeUpload={file => beforeUpload(file)}
            name="avatar"
            listType="text"
            className="avatar-uploader"
            showUploadList={false}
            action="http://ivppublicart.com/admin/upload.php"
          >
            <UploadButton />
          </Upload>
        ) : (
          <Avatar
            src={currentClient.imgUrl ? `./images/${currentClient.imgUrl}` : ''}
            shape="square"
            size="large"
            icon="user"
            style={{ marginRight: 10 }}
          />
        )}
      </>
    }
  >
    <HorizontalLayout align="flex-start">
      <Address
        setClientEditMode={setClientEditMode}
        currentClient={currentClient}
        isInEditMode={isInEditMode || false}
        updateClient={updateClient}
      />
      <ContactInfo
        currentClient={currentClient}
        isInEditMode={isInEditMode || false}
        updateClient={updateClient}
      />
    </HorizontalLayout>
    <Notes
      currentClient={currentClient}
      isInEditMode={isInEditMode || false}
      updateClient={updateClient}
    />
  </RevealPanel>
);

const StyledClientBody = styled(ClientBody)`
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 0px solid;
  margin: 0px;
`;

export default StyledClientBody;

const UploadButton = () => (
  <form action="upload.php" method="post" encType="multipart/form-data">
    <Button ghost={true}>
      <Icon type="upload" />Upload Image
    </Button>
    {/* <input type="file" name="fileToUpload" id="fileToUpload" />
    <input type="submit" value="Upload Image" name="submit" /> */}
  </form>
);

const beforeUpload = (file: {type: string, size: number, name: string}) => {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }

  storage
    .ref()
    .child(`images/${file.name}`)
    .put(file);
  return isJPG && isLt2M;
};
