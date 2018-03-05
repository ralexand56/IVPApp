import React, { Component } from 'react';
import styled from 'styled-components';
import Thumbnails from './Thumbnails';
import { SampleLink } from '../../datatypes';
import ActiveImage from './ActiveImage';

interface Props {
  className?: string;
  sampleLinks?: SampleLink[];
}

interface AppState {
  activeId?: string | null;
}

export default class Carousel extends Component<Props, AppState> {
  constructor(props: Props) {
    super(props);

    this.state = {
      activeId:
        props.sampleLinks && props.sampleLinks.length > 0
          ? props.sampleLinks[0].id
          : null
    };
  }

  handleSetActive = (activeId: string) =>
    this.setState(prevState => ({ activeId: activeId }));

  render() {
    const { activeId } = this.state;
    const { sampleLinks } = this.props;

    // const activeSample =
    //   activeId && sampleLinks
    //     ? sampleLinks.find(x => x.id === activeId)
    //     : undefined;

    return (
      <StyledCarousel>
        {sampleLinks &&
          sampleLinks.map(x => (
            <ActiveImage key={x.id} sample={x} isActive={x.id === activeId} />
          ))}
        <Thumbnails
          activeId={activeId}
          sampleLinks={sampleLinks}
          handleSetActive={this.handleSetActive}
        />
      </StyledCarousel>
    );
  }
}

const StyledCarousel = styled.div`
  padding: 5px;
  width: 100%;
`;
