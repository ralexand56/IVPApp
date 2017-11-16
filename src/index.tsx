import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';
import RevealPanel from './components/RevealPanel';
import './index.css';
import 'antd/dist/antd.css'; 

ReactDOM.render(
  <RevealPanel heading="...Search Results" />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();

// Allow Hot Module Reloading
if (module.hot) {
    module.hot.accept();
}
