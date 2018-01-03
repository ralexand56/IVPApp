import React from 'react';
import ReactDOM from 'react-dom';
import 'core-js';
// import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
// import RevealPanel from './components/RevealPanel';
import SlidingPanel from './components/SlidingPanel';
import { AppContainer } from 'react-hot-loader';
import './index.css';
import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import { ThemeProvider } from './styled-components';
import './index.css';
import configureStore from './configureStore';
import { theme, initializeDB } from './datatypes';
import { init } from './actions/ClientActions';
// import styled from 'styled-components';
require('firebase/firestore');
// const TestStyle = styled.div`
//   border: 2px solid black;
//   width: 100%;
//   height: 100%;
// `;

initializeDB();

const store = configureStore();
init(store.dispatch, store.getState);

ReactDOM.render(
  <AppContainer>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <SlidingPanel />
      </Provider>
    </ThemeProvider>
  </AppContainer>
  ,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();

// Allow Hot Module Reloading
if (module.hot) {
  module.hot.accept();
}
