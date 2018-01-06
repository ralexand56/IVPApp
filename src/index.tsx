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
import styled from 'styled-components';
// import styled from 'styled-components';
require('firebase/firestore');
// const TestStyle = styled.div`
//   border: 2px solid black;
//   width: 100%;
//   height: 100%;
// `;
const HeaderStyle = styled.div`
  background: white;
  color: black;
  padding: 5px 8px;
  font-size: 0.6em;
  margin: 7px 0px 0px 0px;
  text-transform: uppercase;
`;

initializeDB();

const store = configureStore();
init(store.dispatch, store.getState);

ReactDOM.render(
  <AppContainer>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <SlidingPanel background="purple" isOpen={true} title={<HeaderStyle>Address</HeaderStyle>}>
          <div style={{ padding: 8 }}>
            Years ago, I attended the DevTeach conference and was fortunate to
            participate in conversations that helped me overcome many challenges
            over the years that followed. This week I had the opportunity to
            speak at DevTeach in Montreal. For this event, I chose a topic that
            I’m really passionate about and needed to cover a lot of ground in a
            short amount of time.
          </div>
        </SlidingPanel>
      </Provider>
    </ThemeProvider>
  </AppContainer>,
  document.getElementById('root') as HTMLElement,
);

registerServiceWorker();

// Allow Hot Module Reloading
if (module.hot) {
  module.hot.accept();
}
