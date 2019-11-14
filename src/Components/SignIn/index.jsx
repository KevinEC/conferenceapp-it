import React from 'react';
import { withRouter } from 'react-router-dom';

const SignInPage = () => (
	<div>
		<h1>Sign In</h1>
		<SignInForm />
	</div>
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

	onSubmit(event) {
		const { email, password } = this.state

		this.props.firebase.auth.doSignInWithEmailAndPassword(email, password)
		.then(() => {
			this.setState({ ...INITIAL_STATE });
			this.props.history.push()
		})
 	}

	render() {
		return (
			<form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email"
        />
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>
        {error && <p>{error.message}</p>}
      </form>
		);
	}
}

export default 