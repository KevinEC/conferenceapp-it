import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import './App.less';
import { Container } from 'semantic-ui-react';


import Home from "./Components/Home";
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
          <Container>
            <Navbar authenticated={authUser}/>
          </Container>

          <Route exact path={ROUTES.HOME}>
            <Home />
          </Route>

          <Route path={ROUTES.SIGN_IN} component={SignInPage} />

          <Route path={ROUTES.TICKETS} component={Tickets} />
          
        </Router>
      }
    </AuthUserContext.Consumer>
  )
};  

export default withAuthentication(App);