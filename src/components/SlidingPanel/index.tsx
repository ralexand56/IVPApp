import React, { Component } from 'react';
import styled from 'styled-components';
import { Bounce, TimelineMax } from 'gsap';

interface Props {
  background?: string;
  children?: React.ReactChild | Element[];
  className?: string;
  delay?: number;
  isOpen?: boolean;
  title?: React.ReactElement<HTMLElement> | React.ReactChild;
  updateAnimation: boolean;
}

class SlidingPanel extends Component<Props, {}> {
  container: HTMLDivElement | null;
  headerContainer: HTMLElement | null;
  innerContainer: HTMLMainElement | null;
  tl: TimelineMax = new TimelineMax();

  componentWillMount() {
    const { delay, isOpen } = this.props;

    if (this.props.isOpen !== isOpen) {
      if (isOpen) {
        this.container &&
          this.tl.fromTo(
            this.container,
            0.7,
            { scaleY: 0, ease: Bounce.easeOut },
            { scaleY: 1, ease: Bounce.easeOut },
            delay || 0
          );

        this.headerContainer &&
          this.tl.fromTo(
            this.headerContainer,
            0.5,
            { opacity: 0 },
            { opacity: 1 }
          );

        this.innerContainer &&
          this.tl.fromTo(
            this.innerContainer,
            0.3,
            { opacity: 0 },
            { opacity: 1 }
          );
      } else {
        this.innerContainer &&
          this.container &&
          this.tl
            .fromTo(this.innerContainer, 0.5, { opacity: 1 }, { opacity: 0 })
            .fromTo(this.container, 0.5, { scaleY: 1 }, { scaleY: 0 });
      }
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    const { delay, isOpen } = nextProps;
    console.dir(`next: ${isOpen} | current: ${this.props.isOpen}`);

    if (this.props.isOpen !== isOpen) {
      if (isOpen) {
        this.container &&
          this.tl.fromTo(
            this.container,
            0.7,
            { scaleY: 0, ease: Bounce.easeOut },
            { scaleY: 1, ease: Bounce.easeOut },
            delay || 0
          );

        this.headerContainer &&
          this.tl.fromTo(
            this.headerContainer,
            0.5,
            { opacity: 0 },
            { opacity: 1 }
          );

        this.innerContainer &&
          this.tl.fromTo(
            this.innerContainer,
            0.3,
            { opacity: 0 },
            { opacity: 1 }
          );
      } else {
        this.innerContainer &&
          this.container &&
          this.tl
            .fromTo(this.innerContainer, 0.5, { opacity: 1 }, { opacity: 0 })
            .fromTo(this.container, 0.5, { scaleY: 1 }, { scaleY: 0 });
      }
    }
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
