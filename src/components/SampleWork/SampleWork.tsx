import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import actionCreators from '../../actions/ClientActions';
import ThemeInterface from '../../theme';
import styled from '../../styled-components';
import { Client, storage, SampleLink } from '../../datatypes';
import StringList from '../StringList';
import { Button, Icon, Input, message, Popconfirm, Upload } from 'antd';

const Search = Input.Search;

const UploadButton = () => (
  <Button type="primary" ghost={true} size="small">
    <Icon type="upload" />Upload Image
  </Button>
);

const beforeUpload = async (
  file: { type: string; size: number; name: string },
  addSampleWork: typeof actionCreators.addSampleWork,
  currentClient: Client
) => {
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must be smaller than 2MB!');
  }

  if (isLt2M) {
    const imgRef = await storage
      .ref()
      .child(`images/${file.name}`)
      .put(file);

    addSampleWork(await imgRef.ref.getDownloadURL(), true, currentClient);
  }

  return isLt2M;
};

const renderImageLinks = (sampleLinks: SampleLink[]) => {
  return sampleLinks.map(x => (
    <div
      key={x.id}
      style={{ background: 'white', height: '100%', color: 'black' }}
    >
      <img src={x.src} style={{width: 'auto', height: 'auto'}} />
    </div>
  ));
};

interface Props {
  className?: string;
  children?: React.ReactChild;
  deleteSampleLink: typeof actionCreators.deleteSampleLink;
  theme?: ThemeInterface;
  isInEditMode: boolean;
  currentClient: Client;
  addSampleWork: typeof actionCreators.addSampleWork;
  setClientEditMode: typeof actionCreators.setClientEditMode;
  updateClient: typeof actionCreators.updateClient;
}

interface AppState {
  value: string;
}

class SampleWork extends Component<Props, AppState> {
  state: AppState = { value: '' };

  clear = () => this.setState((prevState: AppState) => ({ value: '' }));

  onChange = (value: string) =>
    this.setState((prevState: AppState) => ({ value }));

  render() {
    const {
      addSampleWork,
      className,
      currentClient,
      deleteSampleLink,
      isInEditMode
    } = this.props;

    return (
      <div className={className}>
        {isInEditMode ? (
          <div style={{ width: '100%' }}>
            <div style={{ margin: 10 }}>
              <div style={{ width: '100%' }}>
                {' '}
                <Search
                  style={{ width: '100%' }}
                  value={this.state.value}
                  enterButton={<Icon type="plus" />}
                  placeholder="new image link"
                  size="small"
                  onChange={e => this.onChange(e.currentTarget.value)}
                  onSearch={val => {
                    addSampleWork(val, false, currentClient);
                    this.clear();
                  }}
                />
              </div>
              <div>or</div>
              <div>
                {' '}
                <Upload
                  beforeUpload={file =>
                    beforeUpload(file, addSampleWork, currentClient)
                  }
                  name="avatar"
                  listType="text"
                  className="avatar-uploader"
                  showUploadList={false}
                >
                  <UploadButton />
                </Upload>
              </div>
            </div>
            {currentClient.sampleLinks && (
              <StringList
                label="Image Sources"
                linkList={renderLinkElements(
                  currentClient.sampleLinks,
                  currentClient,
                  deleteSampleLink
                )}
              />
            )}
          </div>
        ) : currentClient.sampleLinks &&
        currentClient.sampleLinks.length > 0 ? (
          <Carousel
            emulateTouch={true}
            showArrows={true}
            autoPlay={true}
            infiniteLoop={false}
          >
            {renderImageLinks(currentClient.sampleLinks)}
          </Carousel>
        ) : (
          <span>No images</span>
        )}
      </div>
    );
  }
}

const renderLinkElements = (
  sampleLinks: SampleLink[],
  currentClient: Client,
  deleteSampleLink: typeof actionCreators.deleteSampleLink
) =>
  sampleLinks.map(x => (
    <span key={x.id}>
      <span>{x.src}</span>
      <Popconfirm
        placement="top"
        title="Are you sure you want to delete the image source?"
        okText="Yes"
        cancelText="No"
        onConfirm={() => deleteSampleLink(x.id, currentClient)}
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
    </span>
  ));

const StyledSampleWork = styled(SampleWork)`
  display: flex;
  width: 100%;
  color: ${props => props.theme.headingBackground2 || 'black'};
  font-size: 0.9em;
  justify-content: ${props => (props.isInEditMode ? 'flex-start' : 'center')};
  img {
    background: 'white';
    display: flex;
    max-width: 290px;
    max-height: 270px;
    width: auto;
    height: auto;
  }
`;

export default StyledSampleWork;
