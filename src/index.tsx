import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// import RevealPanel from './components/RevealPanel';

import { AppContainer } from 'react-hot-loader';
// import SidePanelContainer from './components/SidePanel/SidePanelContainer';
import './index.css';
import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import './index.css';
import configureStore from './configureStore';

const store = configureStore();

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <App />
    </Provider>
  </AppContainer>
  ,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();

// Allow Hot Module Reloading
if (module.hot) {
  module.hot.accept();
}
