import React, { Component } from 'react';
// import styled from 'styled-components';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import SlidingPanel from './SlidingPanel';
// import { MotionValue } from 'popmotion-react';
// declare module 'popmotion-react';

interface Props {
  background?: string;
  children?: React.ReactChild | Element[];
  className?: string;
  delay?: number;
  isOpen?: boolean;
  scaleY?: number;
  title?: React.ReactElement<HTMLElement> | React.ReactChild;
  updateAnimation?: boolean;
}

// const duration = 1000;

// const defaultStyle = {
//   transition: `all ${duration}ms ease-in-out`,
//   transform: `scaleY(1)`,
// };

// const transitionStyles = {
//   entering: { transform: `scaleY(0)` },
//   entered: { transform: `scaleY(1)` },
//   exiting: { transform: `scaleY(1)` },
//   exited: { transform: `scaleY(0)` },
// };

class Pop extends Component<Props, {}> {
  state = { in: true };

  // toggleEnterState = () => {
  //   this.setState({ in: !this.state.in });
  // };

  render() {
    return (
      <TransitionGroup>
        {this.props.isOpen && <SlidingPanel key="sl" />}
      </TransitionGroup>
    );
  }
}

// const StyledPop = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

export default Pop;
