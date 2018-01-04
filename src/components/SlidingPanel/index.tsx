import React, { Component } from 'react';
import styled from 'styled-components';
// import { slideIn, slideOut } from '../../datatypes';
import { Bounce, TimelineMax } from 'gsap';

interface Props {
  children?: React.ReactChild;
  className?: string;
  isOpen?: boolean;
}

// interface BackgroundProps {
//   background?: string;
//   children?: React.ReactChild;
//   className?: string;
//   isOpen: boolean;
// }

// interface ForegroundProps {
//   children?: React.ReactChild;
//   className?: string;
//   isOpen?: boolean;
// }

// const BackgroundPanel: StatelessComponent<BackgroundProps> = ({
//   className,
// }) => <div className={className} />;

// const StyledBackgroundPanel = styled(BackgroundPanel)`
//   transform-origin: 0% 0%;
//   width: 100%;
//   height: 100%;
//   position: absolute;
//   opacity: 1;
//   animation: ${props => (props.isOpen ? slideIn : slideOut)} 1s ease-in-out both;
// `;

class SlidingPanel extends Component<Props, {}> {
  container: HTMLDivElement | null;
  innerContainer: HTMLDivElement | null;
  tl: TimelineMax = new TimelineMax();

  componentDidMount() {
    const { isOpen } = this.props;

    isOpen ? this.innerContainer && this.container && this.tl
          .fromTo(
            this.container,
            0.7,
            { scaleY: 0, ease: Bounce.easeOut },
            { scaleY: 1, ease: Bounce.easeOut },
          )
          .fromTo(
            this.innerContainer,
            0.5,
            { opacity: 0, ease: Bounce.easeOut },
            { opacity: 1, ease: Bounce.easeOut },
          ) : this.innerContainer && this.container && this.tl
          .fromTo(this.innerContainer, 0.5, { opacity: 1 }, { opacity: 0 })
          .fromTo(this.container, 0.5, { scaleY: 1 }, { scaleY: 0 });
  }

  render() {
    const { children, className } = this.props;

    return (
      <div className={className} ref={x => (this.container = x)}>
        <div ref={x => (this.innerContainer = x)}>{children}</div>
      </div>
    );
  }
}

const StyledSlidingPanel = styled(SlidingPanel)`
  background: rgba(0, 0, 0, 0.4);
  color: white;
  font-size: 1em;
  overflow: hidden;
  padding: 10px;
  transform-origin: 0% 0%;
`;

export default StyledSlidingPanel;

// animation: 1s ${props => (props.isOpen ? slideIn : slideOut)} ease-in-out both;
