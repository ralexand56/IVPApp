import React, { Component } from 'react';
import styled from '../../styled-components';
import Transition from 'react-transition-group/Transition';
import { timeline, styler } from 'popmotion';
import Theme from '../../theme';
import { HeaderStyle } from '../../datatypes';

interface Props {
  background?: string;
  border?: string;
  children?: React.ReactChild | Element[];
  className?: string;
  color?: string;
  delay?: number;
  isOpen?: boolean;
  horizontal?: boolean;
  margin?: string;
  theme?: Theme;
  title?:
    | React.ReactElement<HTMLElement>
    | React.ReactChild
    | null
    | Element
    | Element[];
  updateAnimation?: boolean;
}

const duration = 400;

class Pop extends Component<Props, {}> {
  outerPanel: HTMLDivElement | null;
  innerPanel: HTMLDivElement | null;

  componentDidMount() {
    this.props.isOpen || true ? this.enterAnimation() : this.exitAnimation();
  }

  handleEntering() {
    console.dir('entering');
    this.enterAnimation();
  }

  handleExiting() {
    console.dir('exiting');
    this.exitAnimation();
  }

  enterAnimation() {
    const scaleTrack = this.props.horizontal
      ? { track: 'scale', from: { scaleX: 0 }, to: { scaleX: 1 }, duration }
      : { track: 'scale', from: { scaleY: 0 }, to: { scaleY: 1 }, duration };

    timeline([
      scaleTrack,
      {
        track: 'opacity',
        from: { opacity: 0 },
        to: { opacity: 1 },
        duration: 300,
      },
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
    const { title } = this.props;

    return (
      <Transition
        in={this.props.isOpen || true}
        timeout={duration}
        onEntering={() => this.handleEntering()}
        onExit={() => this.handleExiting()}
      >
        {
          <div
            ref={e => (this.outerPanel = e)}
            className={this.props.className}
          >
            <div
              style={{ opacity: 0, overflow: 'hidden' }}
              ref={e => (this.innerPanel = e)}
            >
              <header>
                {title && (
                  <HeaderStyle>
                    <span>{title}</span>
                  </HeaderStyle>
                )}
              </header>
              {this.props.children}
            </div>
          </div>
        }
      </Transition>
    );
  }
}

const StyledPop = styled(Pop)`
  border: ${props => props.border || 'initial'};
  background: ${props =>
    props.background ||
    'white' ||
    props.theme.headingBackground1 ||
    'transparent'};
  color: ${props => props.color || 'initial'};
  display: flex;
  flex-direction: column;
  margin: ${props => props.margin || 0};
  overflow: hidden;
  transform-origin: 0% 0%;
`;

export default StyledPop;
