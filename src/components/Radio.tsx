import * as React from 'react';
import { Component } from 'react';
import styled from 'styled-components';

interface Props {
    activeColor?: string;
    backgroundColor?: string;
    fontSize?: string;
    selectedPropsId?: number;
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
    margin:  ${(props: MainContainerProps) => props.margin}px;
    width:  ${(props: MainContainerProps) => props.width};
    padding: 0.5em;
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
    padding-right: 1em;
`;

const UnderLine = styled.div`
    left: ${(props: { activeLeft: number, activeWidth: number, underlineColor: string }) => props.activeLeft}px;
    height: 2px;
    width: ${(props: { activeLeft: number, activeWidth: number, underlineColor: string }) => props.activeWidth}px;
    background: ${(props: { activeLeft: number, activeWidth: number, underlineColor: string }) => props.underlineColor};
    position: absolute;
    bottom: 5px;
    transition: all 0.5s;
`;

const ItemContent = styled.span`
    color: ${
    (props: { active: boolean, activeColor: string, itemColor: string }) =>
        props.active ? props.activeColor : props.itemColor};
    margin-right: 0.7em;
    cursor: pointer;
    transition: all 0.5s;
    &:hover {
        color: ${(props: { active: boolean, activeColor: string, itemColor: string }) => props.activeColor};
    }   
`;

export default class Radio extends Component<Props, AppState> {
    private items: HTMLSpanElement[] = [];

    constructor(props: Props) {
        super();

        this.state = {
            selectedStateId: props.selectedPropsId ? props.selectedPropsId : 0,
        };
    }

    // componentDidMount() {
    //     this.props.items && this.setState({
    //         ...this.state,
    //         activeLeft: this.items[
    //             this.props.items.findIndex(x => x.id === this.state.selectedStateId)].offsetLeft,
    //         activeWidth: this.items[
    //             this.props.items.findIndex(x => x.id === this.state.selectedStateId)].offsetWidth,
    //     });
    // }

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
            selectedPropsId,
            underlineColor,
            width,
        } = this.props;

        const {
            selectedStateId,
        } = this.state;

        // console.dir(this.items);
        if (!this.props.items) { return null; }

        // const activeIndex = 
   
        // const activeLeft = selectedPropsId
        //     ? this.items[this.props.items.findIndex(x => x.id === selectedPropsId)].offsetLeft
        //     : this.items[this.props.items.findIndex(x => x.id === selectedStateId)].offsetLeft;
        
        // const activeWidth = selectedPropsId
        //     ? this.items[this.props.items.findIndex(x => x.id === selectedPropsId)].offsetWidth
        //     : this.items[this.props.items.findIndex(x => x.id === selectedStateId)].offsetWidth;

        const selectedId = selectedPropsId || selectedStateId;

        return (
            <MainContainer
                backgroundColor={backgroundColor ? backgroundColor : 'white'}
                fontSize={fontSize || '1em'}
                margin={margin ? margin : 10}
                width={width ? `${width}px` : 'auto'}
            >
                <Label labelColor={labelColor ? labelColor : 'black'}>
                    {
                        label
                    }
                </Label>
                <BodyContainer>
                    {
                        (items !== undefined)
                            ? this.renderItems(items, selectedId, onChange, activeColor)
                            : null
                    }
                    <UnderLine
                        activeLeft={this.items.length > 0
                            ? this.items[this.props.items.findIndex(x => x.id === selectedId)].offsetLeft
                            : 0
                        }
                        activeWidth={this.items.length > 0
                            ? this.items[this.props.items.findIndex(x => x.id === selectedId)].offsetWidth
                            : 0
                        }
                        underlineColor={underlineColor ? underlineColor : 'black'}
                    />
                </BodyContainer>
            </MainContainer>
        );
    }

    selectAction = (id: number): number => {
        this.props.items && this.setState({
            selectedStateId: id,
        });

        return id;
    }

    renderItems = (
        items: NameId[],
        selIndex: number,
        onChange: Function | undefined,
        activeColor?: string,
    ) =>
        (
            items.map((x, i) => (
                <ItemContent
                    active={x.id === selIndex}
                    activeColor={activeColor ? activeColor : '#666'}
                    key={x.id}
                    innerRef={(d) => this.items.push(d)}
                    itemColor={this.props.itemColor ? this.props.itemColor : 'black'}
                    onClick={() => onChange ? onChange(x.id) : this.selectAction(x.id)}
                >
                    {x.name}
                </ItemContent>
            ))
        )
}