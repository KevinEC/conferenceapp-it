import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import './App.css';

import Home from "./Components/Home.jsx";
import SignInPage from "./Components/SignIn";

import * as ROUTES from "./Routes/routes";

function App() {
  return (
    <Router>
      <Route path={ROUTES.HOME} component={Home} />

      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
    </Router>
  );
}

export default App;
