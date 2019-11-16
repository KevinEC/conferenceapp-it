import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import './App.css';

import Home from "./Components/Home/Home";
import SignInPage from "./Components/SignIn";
import Tickets from "./Components/Tickets/Tickets"
import Navbar from "./Components/Navbar";

import { AuthUserContext, withAuthentication } from "./Middleware/Session";


import * as ROUTES from "./Constants/routes";

const App = () => {
  
  return(
    <AuthUserContext.Consumer>
      {authUser =>
        <Router>
          <Navbar authenticated={authUser}/>

          <Route path={ROUTES.HOME}>
            <Home authenticated={authUser}/>
          </Route>

          <Route path={ROUTES.SIGN_IN} component={SignInPage} />

          <Route path={ROUTES.TICKETS} component={Tickets} />
          
        </Router>
      }
    </AuthUserContext.Consumer>
  )
};  

export default withAuthentication(App);