import React from 'react';
import './App.less';

import { AuthUserContext, withAuthentication } from "./Middleware/Session";
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import { Container } from 'semantic-ui-react';

import Navbar from "./Components/Navbar";
import SignInPage from "./Components/SignIn";

import Home from "./Components/Home";
import Tickets from "./Components/Tickets/Tickets";
import RoomsEvent from "./Components/RoomsEvent/RoomsEvent";

import Events from "./Components/Events";
import Keynote from "./Components/Events/Keynote";
import CreateEvent from "./Components/Events/CreateEvent";

import * as ROUTES from "./Constants/routes";

const App = () => {
  
  return(
    <AuthUserContext.Consumer>
      {authUser =>
        <Router>
          <Navbar authenticated={authUser}/>

          <Route exact path={ROUTES.HOME} component={Home} />

          <Route path={ROUTES.TICKETS} component={Tickets} />

          <Route exact path={[ROUTES.EVENTS, ROUTES.EVENT]} component={Events} />
          <Route path={ROUTES.KEYNOTE} component={Keynote} />
          <Route path={ROUTES.CREATE_EVENT} component={CreateEvent} />
          <Route path={ROUTES.ROOMS} component={RoomsEvent} />
          
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        </Router>
      }
    </AuthUserContext.Consumer>
  )
};  

export default withAuthentication(App);