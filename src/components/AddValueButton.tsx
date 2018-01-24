import React, { Component } from 'react';
import styled from '../styled-components';
import { Icon, Input, Tag } from 'antd';

interface Props {
  className?: string;
  label: string;
  addNewValue: Function;
}

interface AppState {
  inputVisible: boolean;
  inputValue: string;
}

class AddValueButton extends Component<Props, AppState> {
  state: AppState = { inputVisible: false, inputValue: '' };
  inputRef: Input | null;

  showInput = () => {
    this.setState(
      { inputVisible: true },
      () => this.inputRef && this.inputRef.focus(),
    );
  };

  handleInputChange = (val: string) => {
    this.setState(prevState => ({ inputValue: val }));
  };

  handleInputConfirm = () => {
    // const state = this.state;
    const inputValue = this.state.inputValue;

    this.props.addNewValue(inputValue);

    this.setState({
      inputVisible: false,
      inputValue: '',
    });
  };

  render() {
    const { inputVisible, inputValue } = this.state;
    const { className, label } = this.props;

    return (
      <div className={className}>
        {inputVisible ? (
          <Input
            ref={el => (this.inputRef = el)}
            type="text"
            size="small"
            value={inputValue}
            onChange={e => this.handleInputChange(e.currentTarget.value)}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        ) : (
          <div onClick={this.showInput}>
            <Tag style={{ background: '#fff', borderStyle: 'dashed' }}>
              <Icon type="plus" />
              {label}
            </Tag>
          </div>
        )}
      </div>
    );
  }
}

const StyledAddValueButton = styled(AddValueButton)``;

export default StyledAddValueButton;
