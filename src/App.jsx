import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import './App.less';
import { Container } from 'semantic-ui-react';


import Navbar from "./Components/Navbar";
import SignInPage from "./Components/SignIn";

import Home from "./Components/Home";
import Tickets from "./Components/Tickets/Tickets";
import Events from "./Components/Events";


import { AuthUserContext, withAuthentication } from "./Middleware/Session";

import * as ROUTES from "./Constants/routes";

const App = () => {
  
  return(
    <AuthUserContext.Consumer>
      {authUser =>
        <Router>
          <Navbar authenticated={authUser}/>

          <Route exact path={ROUTES.HOME} component={Home} />
          <Route path={ROUTES.TICKETS} component={Tickets} />
          <Route path={ROUTES.EVENTS} component={Events} />

          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        </Router>
      }
    </AuthUserContext.Consumer>
  )
};  

export default withAuthentication(App);