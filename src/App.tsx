import React, { Component } from 'react';
// import {
//   Card
// } from 'antd';
// import firebase from 'firebase';
require('firebase/firestore');
import './App.css';
import styled from 'styled-components';
import AppHeaderContainer from './components/AppHeaderContainer';
// import Button from './components/Button';
import ClientBody from './components/ClientBody';
import ClientFooter from './components/ClientFooter';
import SidePanelContainer from './components/SidePanel/SidePanelContainer';
import RevealPanel from './components/RevealPanel';
import {
  Client,
  theme,
} from './datatypes';
import {
  Badge,
  Icon,
  Button,
} from 'antd';
import actionCreators from './actions/ClientActions';
// import Btn from '@atlaskit/button';

const MainContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  border: 0px solid;
  padding: 50px 560px 20px 20px;
`;

interface Props {
  addClient: typeof actionCreators.addClient;
  clients: Client[];
  currentClientId: number | undefined;
  isInEditMode: boolean;
  selectedClientTabId: number;
  setClientTab: typeof actionCreators.setClientTab;
  setCurrentClient: typeof actionCreators.setCurrentClient;
}

interface MainBodyProps {
  currentClientIndex: number;
  addClient: typeof actionCreators.addClient;
  clients: Client[];
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
    const {
      addClient,
      clients,
      currentClientId,
      setCurrentClient,
    } = this.props;

    const currentClientIndex = clients.findIndex(x => x.id === currentClientId);
    return (
      < >
      <AppHeaderContainer
      />
      <SidePanelContainer
      />
      <MainBody
        addClient={addClient}
        clients={clients}
        currentClientIndex={currentClientIndex}
        setCurrentClient={setCurrentClient}
      />
      </ >
  );
  }
}

const findMaxId = (clients: Client[]) => {
  let max = 0;

  clients.map(x => x.id >= max ? max = x.id : null);
  return max;
};

const StyledHeader = styled.span`
  font-size: 1.2em;
  font-weight: normal;
`;

const MainBody = (props: MainBodyProps) => (
  <MainContainer>
    <RevealPanel
      endColor={theme.bodyBackground}
      actions={
        [
          <Button
            style={{ margin: 5 }}
            key="addBtn"
            ghost={true}
            size="small"
            onClick={() => props.addClient(findMaxId(props.clients) + 1)}
          >
            <Icon type="plus" />
          </Button>,
          <Button.Group
            key="nav"
            size="small"
          >
            <Button
              size="small"
              ghost={true}
              disabled={props.currentClientIndex === 0}
              onClick={() => props.setCurrentClient(props.clients[props.currentClientIndex - 1].id)}
            >
              <Icon type="left" />
            </Button>
            <Button
              key="nextBtn"
              size="small"
              ghost={true}
              disabled={props.currentClientIndex === props.clients.length - 1}
              onClick={() => props.setCurrentClient(props.clients[props.currentClientIndex + 1].id)}
            >
              <Icon type="right" />
            </Button>
          </Button.Group>,
        ]
      }
      header={
        (
          <StyledHeader>
            <Icon
              type="idcard"
              style={{ margin: 5 }}
            />
            <Badge
              count={props.clients.length}
              style={{ background: theme.headingBackground2 }}
            >
              Clients
            </Badge>
          </StyledHeader>)
      }
      isVisible={true}
    >
      <ClientBody />
      <ClientFooter />
    </RevealPanel>
  </MainContainer>
);