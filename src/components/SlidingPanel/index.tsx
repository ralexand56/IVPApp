import React, { Component } from 'react';
import styled from 'styled-components';
// import { slideIn, slideOut } from '../../datatypes';
import { Bounce, TimelineMax } from 'gsap';

interface Props {
  background?: string;
  children?: React.ReactChild;
  className?: string;
  isOpen?: boolean;
  title?: React.ReactElement<HTMLElement>;
}

class SlidingPanel extends Component<Props, {}> {
  container: HTMLDivElement | null;
  headerContainer: HTMLElement | null;
  innerContainer: HTMLMainElement | null;
  tl: TimelineMax = new TimelineMax();

  componentDidMount() {
    const { isOpen } = this.props;

    isOpen
      ? this.innerContainer &&
        this.container &&
        this.headerContainer &&
        this.tl
          .fromTo(
            this.container,
            0.7,
            { scaleY: 0, ease: Bounce.easeOut },
            { scaleY: 1, ease: Bounce.easeOut },
          )
          .fromTo(
            this.headerContainer,
            0.5,
            { opacity: 0 },
            { opacity: 1 },
          )
          .fromTo(
            this.innerContainer,
            0.3,
            { opacity: 0 },
            { opacity: 1 },
          )
      : this.innerContainer &&
        this.container &&
        this.tl
          .fromTo(this.innerContainer, 0.5, { opacity: 1 }, { opacity: 0 })
          .fromTo(this.container, 0.5, { scaleY: 1 }, { scaleY: 0 });
  }

  render() {
    const { children, className, title } = this.props;

    return (
      <div className={className} ref={x => (this.container = x)}>
        {title && (
          <header ref={x => (this.headerContainer = x)}>{title}</header>
        )}
        <main ref={x => (this.innerContainer = x)}>{children}</main>
      </div>
    );
  }
}

const StyledSlidingPanel = styled(SlidingPanel)`
  background: ${props => props.background || 'rgba(0, 0, 0, 0.8)'};
  display: flex;
  flex-direction: column;
  color: white;
  font-size: 1em;
  overflow: hidden;
  transform-origin: 0% 0%;
`;

export default StyledSlidingPanel;
