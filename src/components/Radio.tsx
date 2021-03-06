import React from 'react';
import { Component } from 'react';
import styled from 'styled-components';

interface Props {
  activeColor?: string;
  backgroundColor?: string;
  fontSize?: string;
  value?: number;
  label?: string;
  labelColor?: string;
  margin?: number;
  items?: NameId[];
  itemColor?: string;
  onChange?: Function;
  width?: number;
  underlineColor?: string;
}

interface AppState {
  selectedStateId: number;
  activeLeft: number;
  activeWidth: number;
}

interface NameId {
  id: number;
  name: string;
}

interface MainContainerProps {
  backgroundColor: string;
  fontSize: string;
  margin: number;
  width: string;
}

const MainContainer = styled.div`
  background: ${(props: MainContainerProps) => props.backgroundColor};
  display: flex;
  font-size: ${(props: MainContainerProps) => props.fontSize || '1em'};
  justify-content: flex-start;
  align-items: center;
  border-radius: 5px;
  margin: ${(props: MainContainerProps) => props.margin || 3}px;
  width: ${(props: MainContainerProps) => props.width || 'unset'};
  padding: 0em;
`;

const BodyContainer = styled.div`
  display: flex;
  border: 0px solid black;
  padding: 7px;
  position: relative;
`;

const Label = styled.span`
  border-right: 1px solid;
  color: ${(props: { labelColor: string }) => props.labelColor};
  font-weight: bold;
  margin: 0.5em;
  padding-right: 0em;
`;

const UnderLine = styled.div`
  left: ${(props: {
    activeLeft: number;
    activeWidth: number;
    underlineColor: string;
  }) => props.activeLeft}px;
  height: 2px;
  width: ${(props: {
    activeLeft: number;
    activeWidth: number;
    underlineColor: string;
  }) => props.activeWidth}px;
  background: ${(props: {
    activeLeft: number;
    activeWidth: number;
    underlineColor: string;
  }) => props.underlineColor};
  position: absolute;
  bottom: 5px;
  transition: all 0.5s;
`;

const ItemContent = styled.span`
  color: ${(props: {
    active: boolean;
    activeColor: string;
    itemColor: string;
  }) => (props.active ? props.activeColor : props.itemColor)};
  margin-right: 0.7em;
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    color: ${(props: {
      active: boolean;
      activeColor: string;
      itemColor: string;
    }) => props.activeColor};
  }
`;

export default class Radio extends Component<Props, AppState> {
  private items: HTMLSpanElement[] = [];

  constructor(props: Props) {
    super(props);

    // console.dir(props.selectedPropsId);

    this.state = {
      selectedStateId: props.value ? props.value : 1,
      activeLeft: 0,
      activeWidth: 0,
    };
  }

  componentDidMount() {
    this.props.items &&
      this.props.value &&
      this.setState({
        ...this.state,
        activeLeft: this.items[
          this.props.items.findIndex(x => x.id === this.props.value)
        ].offsetLeft,
        activeWidth: this.items[
          this.props.items.findIndex(x => x.id === this.props.value)
        ].offsetWidth,
      });
  }

  render() {
    const {
      activeColor,
      backgroundColor,
      fontSize,
      items,
      label,
      labelColor,
      margin,
      onChange,
      value,
      underlineColor,
      width,
    } = this.props;

    // const {
    //     selectedStateId,
    // } = this.state;

    // console.dir(this.items);
    // console.dir(selectedPropsId);
    if (!this.props.items) {
      return null;
    }

    // const activeIndex =

    // const activeLeft = selectedPropsId
    //     ? this.items[this.props.items.findIndex(x => x.id === selectedPropsId)].offsetLeft
    //     : this.items[this.props.items.findIndex(x => x.id === selectedStateId)].offsetLeft;

    // const activeWidth = selectedPropsId
    //     ? this.items[this.props.items.findIndex(x => x.id === selectedPropsId)].offsetWidth
    //     : this.items[this.props.items.findIndex(x => x.id === selectedStateId)].offsetWidth;

    // const selectedId = selectedPropsId;

    return (
      <MainContainer
        backgroundColor={backgroundColor ? backgroundColor : 'transparent'}
        fontSize={fontSize || '1em'}
        margin={margin ? margin : 3}
        width={width ? `${width}px` : 'auto'}
      >
        {label && (
          <Label labelColor={labelColor ? labelColor : 'black'}>{label}</Label>
        )}
        <BodyContainer>
          {items !== undefined
            ? this.renderItems(items, value || 1, onChange, activeColor)
            : null}
          <UnderLine
            activeLeft={
              this.items.length > 0 && value
                ? this.items[this.props.items.findIndex(x => x.id === value)]
                    .offsetLeft
                : 0
            }
            activeWidth={
              this.items.length > 0 && value
                ? this.items[this.props.items.findIndex(x => x.id === value)]
                    .offsetWidth
                : 0
            }
            underlineColor={underlineColor ? underlineColor : 'black'}
          />
        </BodyContainer>
      </MainContainer>
    );
  }

  selectAction = (id: number): number => {
    this.props.items &&
      this.setState({
        selectedStateId: id,
      });

    return id;
  };

  renderItems = (
    items: NameId[],
    selIndex: number,
    onChange: Function | undefined,
    activeColor?: string,
  ) =>
    items.map((x, i) => (
      <ItemContent
        active={x.id === selIndex}
        activeColor={activeColor ? activeColor : '#666'}
        key={x.id}
        innerRef={d => this.items.push(d)}
        itemColor={this.props.itemColor ? this.props.itemColor : 'black'}
        onClick={() => (onChange ? onChange(x.id) : this.selectAction(x.id))}
      >
        {x.name}
      </ItemContent>
    ));
}
