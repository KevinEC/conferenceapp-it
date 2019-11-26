import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import AuthUserContext from "./context";

import * as ROUTES from '../../Constants/routes';

const withAuthorization = (redirect = true, condition) => Component => {
  class WithAuthorization extends React.Component {

    componentDidMount() {
      this.listener = this.props.firebase.auth.doOnAuthStateChanged(
        authUser => {
          if (!condition(authUser)) {
            if(redirect) this.props.history.push(ROUTES.SIGN_IN);
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
        		condition(authUser) ? <Component {...this.props} authUser={authUser} /> : null
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