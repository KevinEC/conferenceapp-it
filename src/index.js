import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import 'semantic-ui-less/semantic.less';
import * as serviceWorker from './serviceWorker';

import App from './App.jsx';
import Firebase, { FirebaseContext } from './Middleware/Firebase'

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
