import React, { Component } from 'react';
import styled from 'styled-components';
import actionCreators from '../../actions/ClientActions';
import { Button, Input, Icon } from 'antd';
import { Client, validateUrl } from '../../datatypes';
import ThemeInterface from '../../theme';

const Search = Input.Search;
const InputGroup = Input.Group;

interface Props {
  addLink: typeof actionCreators.addWebsite;
  className?: string;
  children?: React.ReactChild;
  isInEditMode: boolean;
  theme?: ThemeInterface;
  currentClient: Client;
}

interface AppState {
  value: string;
  aliasValue: string;
}

class Index extends Component<Props, AppState> {
  state: AppState = { value: '', aliasValue: '' };

  clear = () => this.setState(prevState => ({ value: '', aliasValue: '' }));

  handleAddEmail = () => {
    const { value, aliasValue } = this.state;
    const { currentClient } = this.props;

    if (validateUrl(value)) {
      this.props.addLink(
        {
          name: value,
          alias: aliasValue ? aliasValue : value,
          sort: currentClient.websites
            ? currentClient.websites.length * 10
            : 10,
        },
        currentClient,
      );

      this.clear();
    }
  };

  onChange = (value: string) =>
    this.setState((prevState: AppState) => ({ value }));

  onChangeAlias = (value: string) =>
    this.setState((prevState: AppState) => ({ aliasValue: value }));

  render() {
    const { value, aliasValue } = this.state;
    const { className } = this.props;

    return (
      <div className={className}>
        <Search
          value={value}
          onChange={e => this.onChange(e.currentTarget.value)}
          onSearch={val => this.handleAddEmail()}
          placeholder="new link..."
          enterButton={<Icon type="link" />}
          size="small"
        />{' '}
        <InputGroup size="small" compact={true}>
          <Input
            style={{ width: '85%' }}
            value={aliasValue}
            onChange={e => this.onChangeAlias(e.currentTarget.value)}
            placeholder="optional alias..."
            size="small"
          />
          <Button
            style={{ width: '15%' }}
            size="small"
            disabled={!validateUrl(value)}
          >
            <Icon type="plus" />
          </Button>
        </InputGroup>
      </div>
    );
  }
}

const StyledIndex = styled(Index)`
  display: block;
  margin: 5px;
`;

export default StyledIndex;
