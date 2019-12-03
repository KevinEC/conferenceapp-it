import React from 'react';

import "./index.less";

import { withRouter } from 'react-router-dom';
import { withFirebase } from "../../Middleware/Firebase";

import { compose } from 'recompose';

import { Container, Button, Form } from "semantic-ui-react";

import * as ROUTES from "../../Constants/routes.js";

const SignInPage = () => (
	<Container className="signin-root">
		<div className="signin-card">
			<h1>Sign In</h1>
			<SignInForm />
		</div>
	</Container>
);

const INITIAL_STATE = {
	email: '',
	password: '',
	error: null
};

class SignInFormBase extends React.Component {
	

	constructor(props) {
		super(props);

		this.state = {...INITIAL_STATE};
	}

	onSubmit = event => {
		const { email, password } = this.state;
		
		this.props.firebase.auth.doSignInWithEmailAndPassword(email, password)
		.then(() => {
			this.setState({ ...INITIAL_STATE });
			this.props.history.push(ROUTES.HOME)
		})
		.catch(error => {
			this.setState({ error });
		});
		
		event.preventDefault();
 	};

 	onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	render() {

		const { email, password, error } = this.state;

		const isInvalid = password === '' || email === '';

		return (
			<Form className="singin-form" onSubmit={this.onSubmit}>
			    <Form.Input
			    	label="email"
			      name="email"
			      value={email}
			      onChange={this.onChange}
			      type="text"
			      placeholder="Email"
			    />
			    <Form.Input
			      label="password"
			      name="password"
			      value={password}
			      onChange={this.onChange}
			      type="password"
			      placeholder="Password"
			    />
			    <Form.Button 
			    	primary 
			    	disabled={isInvalid} 
			    	className="signin-submit"
			    	type="submit"
		    	>
			      Sign In
			    </Form.Button>
			    {error && <p>{error.message}</p>}
		  	</Form>
		);
	}
}

const SignInForm = compose(
	withRouter,
	withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm };