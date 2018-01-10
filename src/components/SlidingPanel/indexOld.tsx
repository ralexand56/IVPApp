import React, { Component } from 'react';
import styled from 'styled-components';
import { Bounce, TimelineMax } from 'gsap';
import { easing, keyframes, tween, styler, transform } from 'popmotion';

interface Props {
  background?: string;
  children?: React.ReactChild | Element[];
  className?: string;
  delay?: number;
  isOpen?: boolean;
  title?: React.ReactElement<HTMLElement> | React.ReactChild;
  updateAnimation: boolean;
}

interface AppState {
  count: number;
  x: number;
  y: number;
}

class SlidingPanel extends Component<Props, AppState> {
  container: HTMLDivElement | null;
  headerContainer: HTMLElement | null;
  innerContainer: Element | null;
  tl: TimelineMax = new TimelineMax();

  constructor(props: Props) {
    super(props);

    this.state = { count: 0, x: 0, y: 0 };
  }

  componentDidMount() {
    const { steps } = transform;
    steps(1);
    // const addOne = (y: number) => y + 1;
    this.innerContainer &&
      keyframes({
        values: [
          { scaleY: 0, opacity: 0, duration: 500 },
          { scaleY: 1, opacity: 0, duration: 500 },
          { scaleY: 1, opacity: 1 },
        ],
        duration: 5000,
      }).start(styler(this.innerContainer).set);
  }

  componentWillMount() {
    // .start(x => this.setState((prev: AppState) => ({ count: x })));

    // listen(document, 'mousemove').start((e: MouseEvent) => {
    //   this.setState((prevState: AppState) => ({ x: e.clientX, y: e.clientY }));
    //   // pointer().start(({ x, y }) => this.setState((prevState: AppState) => ({x, y})));
    // });
    // listen(document, 'mousedown touchstart')
    //   .start((e) => console.dir(e));
    const { delay, isOpen } = this.props;

    if (this.props.isOpen !== isOpen) {
      if (isOpen) {
        this.container &&
          this.tl.fromTo(
            this.container,
            0.7,
            { scaleY: 0, ease: Bounce.easeOut },
            { scaleY: 1, ease: Bounce.easeOut },
            delay || 0,
          );

        this.headerContainer &&
          this.tl.fromTo(
            this.headerContainer,
            0.5,
            { opacity: 0 },
            { opacity: 1 },
          );

        this.innerContainer &&
          this.tl.fromTo(
            this.innerContainer,
            0.3,
            { opacity: 0 },
            { opacity: 1 },
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
    // console.dir(`next: ${isOpen} | current: ${this.props.isOpen}`);

    if (this.props.isOpen !== isOpen) {
      if (isOpen) {
        this.container &&
          this.tl.fromTo(
            this.container,
            0.7,
            { scaleY: 0, ease: Bounce.easeOut },
            { scaleY: 1, ease: Bounce.easeOut },
            delay || 0,
          );

        this.headerContainer &&
          this.tl.fromTo(
            this.headerContainer,
            0.5,
            { opacity: 0 },
            { opacity: 1 },
          );

        this.innerContainer &&
          this.tl.fromTo(
            this.innerContainer,
            0.3,
            { opacity: 0 },
            { opacity: 1 },
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

  tween() {
    // const ball: Element | null = document.querySelector('#css .ball');
    // const updateCounter = (v: number) =>
    //   this.setState((prevState: AppState) => ({ count: v }));
    this.innerContainer &&
      tween({
        from: { x: 10 },
        to: { x: 100 },
        duration: 700,
        ease: easing.circInOut,
      }).start(styler(this.innerContainer).set);
  }

  render() {
    const { children, className, title } = this.props;

    return (
      <div
        className={className}
        ref={x => (this.container = x)}
        onClick={() => this.tween()}
      >
        {`count: ${this.state.count}, x: ${this.state.x} y: ${this.state.y}`}
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
