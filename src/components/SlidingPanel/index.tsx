import React, { Component } from 'react';
import styled from 'styled-components';
// import { tween } from 'popmotion';
import Transition from 'react-transition-group/Transition';
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

// const stateChangeHandlers = {
//   componentWillAppear: ({value, complete}) =>
//     tween({
//       from: value.get(),
//       to: 1,
//     }).start({
//       update: value,
//       complete: complete,
//     }),
// };

class Pop extends Component<Props, {}> {
  render() {
    return (
      <Transition in={true} timeout={50000}>
        {(status) => (
          <div
            className={this.props.className}
          >
            {this.props.children}
            <span>{status}</span>
          </div>
        )}
      </Transition>
    );
  }
}

const StyledPop = styled(Pop)`
  display: flex;
  background: white;
  flex-direction: column;
  padding: 1.4em;
  opacity: 1;
  transition: all 50000ms ease-in-out;
`;

export default StyledPop;
