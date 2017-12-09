import React, { Component } from 'react';
// import {
//   Card
// } from 'antd';
// import firebase from 'firebase';
require('firebase/firestore');
import './App.css';
import AppHeaderContainer from './components/AppHeaderContainer';
// import Button from './components/Button';
import SidePanel from './components/SidePanel';
import { Client } from './datatypes';
import MainBody from './components/MainBody';
// import Btn from '@atlaskit/button';

interface Props {
  addClient: typeof actionCreators.addClient;
  clients: Client[];
  currentClientId: number | undefined;
  isInEditMode: boolean;
  selectedClientTabId: number;
  setClientTab: typeof actionCreators.setClientTab;
  setCurrentClient: typeof actionCreators.setCurrentClient;
}

// const Button = styled.button`
//   background: transparent;
//   border: none;
// `;

// const StyledCard = styled(Card) `
//   color: orange;
//   margin: 50px;
//   width: 300px;
//   background: #ECECEC;
// `;

export default class App extends Component<Props, {}> {
  // async componentDidMount() {
  //   firebase.initializeApp(config);

  //   const db = firebase.firestore();

  //   db.collection('clients').get().then((querySnapshot) => {
  //     console.dir(querySnapshot.docs.map(x => x.data()));
  //   });

  // const docData = {
  //   stringExample: 'Hello world!',
  //   booleanExample: true,
  //   numberExample: 3.14159265,
  //   dateExample: new Date('December 10, 1815'),
  //   arrayExample: [5, true, 'hello'],
  //   nullExample: null,
  //   objectExample: {
  //       a: 5,
  //       b: {
  //           nested: 'foo'
  //       }
  //   }
  // };

  // db.collection('rand').doc('one').set(docData).then(x => console.dir(x));

  // const cities = await db.collection('cities').add({
  //   name: 'Tokyo',
  //   country: 'Japan'
  // });

  // console.dir(cities.id);

  // console.dir(newOne.then(x => ));

  //   db.collection('clients').add(  {
  //     id: 2,
  //     isActive: true,
  //     firstName: 'Tony',
  //     lastName: 'Soprano',
  //     address1: '34 42nd Street',
  //     address2: 'Unit 300',
  //     city: 'Manhattan',
  //     state: 'NY',
  //     country: 'US',
  //     imgUrl: 'leonardo.jpg',
  //     phone: '123-122-2322',
  //     email: 'leo@gmail.com',
  //     website: 'http://www.louvre.fr/en',
  //     title: 'Artiste',
  //     company: 'Louvre',
  //     comments: [
  //       {
  //         id: 1,
  //         body: 'work was esoteric and derivative',
  //         created: new Date(1900, 12, 25),
  //         user: defaultUser
  //       },
  //       {
  //         id: 2,
  //         body: 'Check out latest collection',
  //         created: new Date(1900, 12, 25),
  //         user: defaultUser
  //       },
  //       {
  //         id: 3,
  //         body: 'contact to show work',
  //         created: new Date(1900, 12, 25),
  //         user: defaultUser
  //       },
  //       {
  //         id: 4,
  //         body: 'artist difficutl to work with',
  //         created: new Date(1900, 12, 25),
  //         user: defaultUser
  //       }
  //     ]
  //   }, )
  // .then((docRef) => {
  //     console.dir('Document written with ID: ', docRef.id);
  // })
  // .catch((error) => {
  //     console.dir('Error adding document: ', error);
  // });
  // }

  handleChange = () => {
    let i = 0;

    console.dir(i);
  }

  render() {

    return (
      <div>
        <AppHeaderContainer />
        <SidePanel />
        <MainBody />
      </div>
    );
  }
}