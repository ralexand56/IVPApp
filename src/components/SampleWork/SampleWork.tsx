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
  <form action="upload.php" method="post" encType="multipart/form-data">
    <Button type="primary" ghost={true}>
      <Icon type="upload" />Upload Image
    </Button>
    {/* <input type="file" name="fileToUpload" id="fileToUpload" />
      <input type="submit" value="Upload Image" name="submit" /> */}
  </form>
);

interface AppState {
  imgLinks: SampleLink[];
}

// const GetGoogleStorageUrl = (path: string): string => {
//   storage
//     .ref(`${path}`)
//     .getDownloadURL()
//     .then(url => {
//       console.dir(url);
//       return url;
//     })
//     .catch(y => {
//       console.dir(y);
//       return undefined;
//     });

//   return '';
// };

const beforeUpload = async (
  file: { type: string; size: number; name: string },
  addSampleWork: typeof actionCreators.addSampleWork,
  currentClient: Client,
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

class SampleWork extends Component<Props, {}> {
  state: AppState = { imgLinks: [] };

  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.props.currentClient.sampleLinks &&
      this.renderImageLinks(this.props.currentClient.sampleLinks);
  }

  getImageLink = async (s: SampleLink) =>
    s.isLocal ? await storage.ref(`images/${s.src}`).getDownloadURL() : s.src;

  renderImageLinks = (sampleLinks: SampleLink[]) => {
    // let elements: string[] = [];
    // console.dir(sampleLinks);
    // const promises = sampleLinks.filter(y => y.isLocal).map(async x => (
    //   <div key={x.id}>
    //     <img src={await storage.ref(`images/${x.src}`).getDownloadURL()} />
    //   </div>
    // ));

    // console.dir(promises);

    // sampleLinks.map(async x => {
    //   let link: string = x.isLocal ? await this.getImageLink(x) : x.src;

    //   this.setState((prevState: AppState) => ({
    //     imgLinks: [
    //       ...prevState.imgLinks,
    //       { id: x.id, src: link, isLocal: x.isLocal },
    //     ],
    //   }));
    // });

    return sampleLinks.map(x => (
      <div key={x.id}>
        <img src={x.src} />
      </div>
    ));
    // console.dir(await elements);
    // console.dir(elements);
    // await this.setState(prevState => ({ imgLinks: elements }));

    // Promise.all(elements).then(x => {
    //   console.dir(x);
    //   this.setState(prevState => ({ imgLinks: x }));
    // });

    // console.dir(elements);

    // return <h1>Done</h1>;
    // return elements.forEach((x, i) => (
    //   <div key={i}>
    //     <img src={x} />
    //   </div>
    // ));
  };

  render() {
    const {
      addSampleWork,
      className,
      currentClient,
      deleteSampleLink,
      isInEditMode,
    } = this.props;
    // console.dir(this.state.imgLinks);

    return (
      <div className={className}>
        {isInEditMode ? (
          <div>
            <div style={{ margin: 10 }}>
              <Search
                placeholder="add image link"
                onSearch={val => addSampleWork(val, false, currentClient)}
              />{' '}
              or{' '}
              <Upload
                beforeUpload={file =>
                  beforeUpload(file, addSampleWork, currentClient)
                }
                name="avatar"
                listType="text"
                className="avatar-uploader"
                showUploadList={false}
                action="http://ivppublicart.com/admin/upload.php"
              >
                <UploadButton />
              </Upload>
            </div>
            {currentClient.sampleLinks && (
              <StringList
                label="Image Sources"
                linkList={renderLinkElements(
                  currentClient.sampleLinks,
                  currentClient,
                  deleteSampleLink,
                )}
              />
            )}
          </div>
        ) : (
          <Carousel showArrows={true} autoPlay={true} infiniteLoop={true}>
            {currentClient.sampleLinks &&
              this.renderImageLinks(currentClient.sampleLinks)}
          </Carousel>
        )}
      </div>
    );
  }
}

const renderLinkElements = (
  sampleLinks: SampleLink[],
  currentClient: Client,
  deleteSampleLink: typeof actionCreators.deleteSampleLink,
) =>
  sampleLinks.map(x => (
    <span key={x.id}>
      <span>{x.src}</span>
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
            margin: 5,
          }}
          onClick={() => deleteSampleLink(x.id, currentClient)}
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
  justify-content: ${props => (props.isInEditMode ? 'flex-start' : 'center')};
  img {
    display: flex;
    max-width: 290px;
    max-height: 270px;
    width: auto;
    height: auto;
  }
`;

export default StyledSampleWork;
