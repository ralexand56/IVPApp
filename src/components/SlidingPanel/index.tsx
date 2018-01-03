import React, { Component } from 'react';
import styled from 'styled-components';
import Animated from 'animated';

interface Props {
  children?: React.ReactChild;
  className?: string;
}
class SlidingPanel extends Component<Props, {}> {
  state = {
    slidingAnim: new Animated.Value(0),
  };

  render() {
    return <Animated.div className={this.props.className}>{this.props.children}</Animated.div>;
  }
}

const StyledSlidingPanel = styled(SlidingPanel)`
  display: flex;
`;

export default StyledSlidingPanel;
