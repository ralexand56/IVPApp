import React, { Component } from 'react';
import styled from '../../styled-components';
import Transition from 'react-transition-group/Transition';
import { timeline, styler } from 'popmotion';
import Theme from '../../theme';
// import SlidingPanel from './SlidingPanel';

interface Props {
  background?: string;
  children?: React.ReactChild | Element[];
  className?: string;
  delay?: number;
  isOpen?: boolean;
  horizontal?: boolean;
  theme?: Theme;
  title?:
    | React.ReactElement<HTMLElement>
    | React.ReactChild
    | Element
    | Element[];
  updateAnimation?: boolean;
}

const duration = 400;

// const slideIn = (ele: Element) => {
//   tween({
//     from: { scaleY: 0 },
//     to: { scaleY: 1 },
//     duration,
//   }).start({ update: styler(ele).set });
// };

// const setStylers = (v: typeof Update, ele1: Element, ele2: Element) => {
//   v.shade && styler(ele1).set(v.scale);
//   v.modal && styler(ele2).set(v.opacity);
// };

// const slideIn = (ele: Element, inner: Element) => {
//   tween({
//     from: { scaleY: 0 },
//     to: { scaleY: 1 },
//     duration,
//   }).start({ update: styler(ele).set, complete: () => fadeIn(inner) });
// };

// const slideOut = (ele: Element) => {
//   tween({
//     from: { scaleY: 1 },
//     to: { scaleY: 0 },
//   }).start(styler(ele).set);
// };

// const fadeIn = (ele: Element) => {
//   tween({
//     from: { opacity: 0 },
//     to: { opacity: 1 },
//     duration,
//   }).start({ update: styler(ele).set });
// };

class Pop extends Component<Props, {}> {
  state = { in: true };
  outerPanel: HTMLDivElement | null;
  innerPanel: HTMLDivElement | null;

  componentDidMount() {
    this.props.isOpen ? this.enterAnimation() : this.exitAnimation();
  }

  handleEntered() {
    // console.dir('entered');
  }

  handleEntering() {
    // console.dir('entering');
    this.enterAnimation();
  }

  handleExiting() {
    // console.dir('exiting');
    this.exitAnimation();
  }

  handleExited() {
    // console.dir('exited');
    // this.exitAnimation();
  }

  toggleEnterState() {
    this.setState({ in: !this.state.in });
  }

  enterAnimation() {
    const scaleTrack = this.props.horizontal
      ? { track: 'scale', from: { scaleX: 1 }, to: { scaleX: 0 }, duration }
      : { track: 'scale', from: { scaleY: 1 }, to: { scaleY: 0 }, duration };

    timeline([
      { track: 'scale', from: { scaleX: 0 }, to: { scaleX: 1 }, duration },
      scaleTrack,
    ]).start(v => {
      v.scale && this.outerPanel && styler(this.outerPanel).set(v.scale);
      v.opacity && this.innerPanel && styler(this.innerPanel).set(v.opacity);
    });
  }

  exitAnimation() {
    const scaleTrack = this.props.horizontal
      ? {
          track: 'scale',
          from: { scaleX: 1 },
          to: { scaleX: 0 },
          duration,
        }
      : {
          track: 'scale',
          from: { scaleY: 1 },
          to: { scaleY: 0 },
          duration,
        };

    timeline([
      {
        track: 'opacity',
        from: { opacity: 1 },
        to: { opacity: 0 },
        duration: 300,
      },
      scaleTrack,
    ]).start(v => {
      v.scale && this.outerPanel && styler(this.outerPanel).set(v.scale);
      v.opacity && this.innerPanel && styler(this.innerPanel).set(v.opacity);
    });
  }

  render() {
    return (
      <Transition
        in={this.props.isOpen}
        timeout={duration}
        onEntering={() => this.handleEntering()}
        onExited={() => this.handleExited()}
        onExit={() => this.handleExiting()}
      >
        {
          <div
            ref={e => (this.outerPanel = e)}
            className={this.props.className}
          >
            <div style={{ opacity: 0 }} ref={e => (this.innerPanel = e)}>
              {this.props.children}
            </div>
          </div>
        }
      </Transition>
    );
  }
}

// const InnerPanel = styled.div`
//   opacity: 0;
// `;

const StyledPop = styled(Pop)`
  background: ${props =>
    props.background || props.theme.headingBackground1 || 'red'};
  color: white;
  display: flex;
  flex-direction: column;
  transform-origin: 0% 0%;
`;

export default StyledPop;
