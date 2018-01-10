import React, { Component } from 'react';
// import { tween } from 'popmotion';
// import Transition from 'react-transition-group/Transition';
// import { TweenMax } from 'gsap';
// import styled from 'styled-components';

interface Props {
  className?: string;
}

class SlidingPanel extends Component<Props, {}> {
  el: HTMLDivElement | null;

  //   componentDidMount() {
  //     this.el &&
  //       TweenMax.fromTo(this.el, 1, { y: 100, opacity: 0 }, { y: 0, opacity: 1 });
  //     // console.dir('Mounted');
  //   }

  componentDidEnter() {
    console.dir('did enter');
  }

  componentWillEnter() {
    console.dir('entered');

    // tween().start({
    //   complete: callback,
    // });
    // this.el &&
    //   TweenMax.fromTo(
    //     this.el,
    //     0.3,
    //     { y: 100, opacity: 0 },
    //     { y: 0, opacity: 1, onComplete: callback },
    //   );
  }

  componentWillLeave(callback: () => {}) {
    console.dir('hey');
  }

  render() {
    return (
        <div
          style={{ background: 'red', width: 100, height: 100 }}
          key="l"
          ref={e => (this.el = e)}
        />
    );
  }
}

// const StyledSlidingPanel = styled(SlidingPanel)`
//   display: flex;
//   flex-direction: column;
// `;

export default SlidingPanel;
