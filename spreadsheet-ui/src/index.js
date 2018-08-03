// import React from 'react';
// import ReactDOM from 'react-dom';

// import registerServiceWorker from './registerServiceWorker';
// import App from './App'
// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { CookiesProvider } from 'react-cookie';

ReactDOM.render((
  <BrowserRouter>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </BrowserRouter>
), document.getElementById('root'));

