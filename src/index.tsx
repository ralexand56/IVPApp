import React from 'react';
import ReactDOM from 'react-dom';
import 'core-js';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
// import RevealPanel from './components/RevealPanel';
// import SlidingPanel from './components/SlidingPanel';
import { AppContainer } from 'react-hot-loader';
import './index.css';
import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import './index.css';
import configureStore from './configureStore';
import { theme, initializeDB } from './datatypes';
import { init } from './actions/ClientActions';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import styled from 'styled-components';
require('firebase/firestore');

initializeDB();

export const store = configureStore();
init(store.dispatch, store.getState);

// const user = store.getState().clientSlice.currentUser;
// console.dir(user);
// user && importClients(user);

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </AppContainer>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();

// Allow Hot Module Reloading
if (module.hot) {
  module.hot.accept();
}

// <>
// <img src="./images/logo.png" />
// <SlidingPanel
//   background="#867290"
//   isOpen={false}
//   title={<HeaderStyle>Name</HeaderStyle>}
// >
//   <div style={{ padding: 20, color: '#fff' }}>Rico Alexander</div>
// </SlidingPanel>
// <SlidingPanel
//   background="#867290"
//   delay={1}
//   isOpen={false}
//   title={<HeaderStyle>Address</HeaderStyle>}
// >
//   <div style={{ padding: 20, color: '#fff' }}>
//     Years ago, I attended the DevTeach conference and was fortunate to
//     participate in conversations that helped me overcome many
//     challenges over the years that followed. This week I had the
//     opportunity to speak at DevTeach in Montreal. For this event, I
//     chose a topic that I’m really passionate about and needed to cover
//     a lot of ground in a short amount of time.
//   </div>
// </SlidingPanel>
// </>
