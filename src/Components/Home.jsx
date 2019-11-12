import React from 'react';

import { withFirebase } from "../Firebase";

class Home extends React.Component {

	constructor(props) {
		super(props);

		this.log = this.log.bind(this);
	}

	componentDidMount(){
		this.props.firebase.addDummyData();
	}

	log() {
		const events = this.props.firebase.getAll('users');
		console.log("Events: ", events);
	}

	render() {
		return (
			<div>
				<h1>home component</h1>
				<button onClick={this.log}>{"console.log"}</button>
			</div>
		);
	}
}
export default withFirebase(Home);