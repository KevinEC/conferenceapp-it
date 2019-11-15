import React from 'react';
import { compose } from 'recompose';

import { withRouter } from 'react-router-dom';
import { withFirebase } from '../index.js';
import AuthUserContext from "./context";

import * as ROUTES from '../../Routes/routes';

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {

    componentDidMount() {
      this.listener = this.props.firebase.auth.doOnAuthStateChanged(
        authUser => {
          if (!condition(authUser)) {
            this.props.history.push(ROUTES.SIGN_IN);
          }
        },
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
      	//render wrapped component if condition is met
      	<AuthUserContext.Consumer>
      		{ authUser =>
        		condition(authUser) ? <Component {...this.props} /> : null
      		}
        </AuthUserContext.Consumer>
      );
    }
  }

  return compose(
    withRouter,
    withFirebase,
  )(WithAuthorization);
};

export default withAuthorization;