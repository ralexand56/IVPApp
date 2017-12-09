import React from 'react';
import ReactDOM from 'react-dom';
import 'core-js';
// import AppMainContainer from './AppContainer';
import registerServiceWorker from './registerServiceWorker';
// import RevealPanel from './components/RevealPanel';

import { AppContainer } from 'react-hot-loader';
import SidePanel from './components/ClientBody';
// import SidePanelContainer from './components/SidePanel/SidePanelContainer';
import './index.css';
import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import { ThemeProvider } from './styled-components';
import './index.css';
import configureStore from './configureStore';
import { theme } from './datatypes';

const store = configureStore();

ReactDOM.render(
  <AppContainer>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <SidePanel />
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
