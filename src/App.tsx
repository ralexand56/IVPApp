import React, { Component } from 'react';
// import {
//   Badge
// } from 'antd';
import './App.css';
import styled from 'styled-components';

// const dataSource = [{
//   key: '1',
//   name: 'Mike',
//   age: 32,
//   address: '10 Downing Street'
// }, {
//   key: '2',
//   name: 'John',
//   age: 42,
//   address: '10 Downing Street'
// }];

// const columns = [{
//   title: 'Name',
//   dataIndex: 'name',
//   key: 'name',
// }, {
//   title: 'Age',
//   dataIndex: 'age',
//   key: 'age',
// }, {
//   title: 'Address',
//   dataIndex: 'address',
//   key: 'address',
// }];

const CustomTable = styled.div `
  color: orange;
  margin: 50px;
`;

const Btn = styled.button`
  color: blue;
`;

export default class App extends Component<{}, {}> {
  render() {
    return (
      [
        <Btn key="a" />,
        <CustomTable key="b" />
      ]
    );
  }
}
