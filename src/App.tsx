import React, { Component } from 'react';
// import firebase from 'firebase';
import './App.css';
import AppHeader from './components/AppHeader';
import SidePanel from './components/SidePanel';
import MainBody from './components/MainBody';

export default class App extends Component<{}, {}> {
  render() {

    return (
      <>
        <AppHeader />
        <SidePanel />
        <MainBody />
      </>
    );
  }
}