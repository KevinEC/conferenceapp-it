import React from 'react';

import AuthUserContext from "./context.js";
import { withFirebase } from "../Firebase";

const withAuthentication = Component => {
	class WithAuthentication extends React.Component {
		constructor(props) {
			super(props);

			this.state = {
				authUser: null
			};
		};

	  // authenticate user on mount
	  componentDidMount() {
	  	this.listener = this.props.firebase.auth.doOnAuthStateChanged(authUser => {

	  		if(authUser) { this.setState({ authUser: authUser }); }
	  		else { this.setState({authUser: null}); }
	  	});
	  }

	  componentWillUnmount() {
	    this.listener(); // remove listener. Built into the firebase interface. The onAuthStateChanged function returns the unsubscribe function
	  }

	  render() {
	  	return (
		  	<AuthUserContext.Provider value={this.state.authUser}>
		  		<Component {...this.props} authUser={this.state.authUser} />
		  	</AuthUserContext.Provider>
		  );
	  }
	}
return withFirebase(WithAuthentication);
};

export default withAuthentication;