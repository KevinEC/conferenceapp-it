import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import './App.css';

import Home from "./Components/Home.jsx";
import SignInPage from "./Components/SignIn";

import { AuthUserContext, withAuthentication } from "./Middleware/Session";

import * as ROUTES from "./Constants/routes";

const App = () => {
  
  return(
    <AuthUserContext.Consumer>
      {authUser =>
        <Router>
          <div>
            <Route path={ROUTES.HOME}>
              <Home authenticated={authUser}/>
            </Route>

            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          </div>
        </Router>
      }
    </AuthUserContext.Consumer>
  )
};  

export default withAuthentication(App);
