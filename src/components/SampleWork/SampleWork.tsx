import React, { StatelessComponent } from 'react';
import { Carousel } from 'react-responsive-carousel';
import actionCreators from '../../actions/ClientActions';
import ThemeInterface from '../../theme';
import styled from '../../styled-components';
import { Client, storage } from '../../datatypes';
import StringList from '../StringList';
import { Button, Icon, Input, message, Popconfirm, Upload } from 'antd';

const Search = Input.Search;

const UploadButton = () => (
  <form action="upload.php" method="post" encType="multipart/form-data">
    <Button type="primary" ghost={true}>
      <Icon type="upload" />Upload Image
    </Button>
    {/* <input type="file" name="fileToUpload" id="fileToUpload" />
      <input type="submit" value="Upload Image" name="submit" /> */}
  </form>
);

const beforeUpload = (file: { type: string; size: number; name: string }) => {
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

interface Props {
  className?: string;
  children?: React.ReactChild;
  theme: ThemeInterface;
  isInEditMode: boolean;
  currentClient: Client;
  addSampleWork: typeof actionCreators.addSampleWork;
  setClientEditMode: typeof actionCreators.setClientEditMode;
  updateClient: typeof actionCreators.updateClient;
}

const SampleWork: StatelessComponent<Props> = ({
  addSampleWork,
  className,
  currentClient,
  isInEditMode,
  theme
}) => (
  <div className={className}>
    {isInEditMode ? (
      <div>
        <Search
          placeholder="add image link"
          onSearch={val => addSampleWork(val, false, currentClient)}
        />{' '}
        or{' '}
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
        <StringList
          label="Image Sources"
          linkList={[
            <span key={1}>
              samples.png
              <Popconfirm
                placement="top"
                title="Are you sure you want to delete the image source?"
                okText="Yes"
                cancelText="No"
              >
                <Button
                  size="small"
                  ghost={true}
                  style={{
                    margin: 5
                  }}
                  type="primary"
                >
                  <Icon type="minus" />
                </Button>
              </Popconfirm>
            </span>,
            <span key={2}>
              https://s.blogcdn.com/www.dailyfinance.com/media/2013/05/artist-604cs052113.jpg
              <Popconfirm
                placement="top"
                title="Are you sure you want to delete comment?"
                okText="Yes"
                cancelText="No"
              >
                <Button
                  size="small"
                  style={{
                    color: theme ? theme.headingBackground2 : 'white',
                    margin: 5
                  }}
                >
                  <Icon type="minus" />
                </Button>
              </Popconfirm>
            </span>
          ]}
        />
      </div>
    ) : (
      <Carousel showArrows={true} autoPlay={true} infiniteLoop={false}>
        <div>
          <img src="./images/samples.png" />
        </div>
        <div>
          <img src="https://s.blogcdn.com/www.dailyfinance.com/media/2013/05/artist-604cs052113.jpg" />
        </div>
        <div>
          <img src="./images/warhol.jpg" />
        </div>
      </Carousel>
    )}
  </div>
);

const StyledSampleWork = styled(SampleWork)`
  display: flex;
  justify-content: ${props => (props.isInEditMode ? 'flex-start' : 'center')};
  width: 100%;
  img {
    display: flex;
    max-width: 290px;
    max-height: 270px;
    width: auto;
    height: auto;
  }
`;

export default StyledSampleWork;
