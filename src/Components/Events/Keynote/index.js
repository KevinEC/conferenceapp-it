import React from 'react';
import "./index.less";

import { compose } from 'recompose';
import { withRouter } from "react-router-dom";
import { withFirebase } from "../../../Middleware/Firebase";

class Keynote extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			id: this.props.match.params.name
		};
	}

	componentDidMount() {
		this.getKeynote();
	}

	getKeynote = async () => {
		let data = await this.props.firebase.db.getDocument('keynotes', this.state.id);

		console.log("data from getKeynote: ", data);
	};

	render() {
		let name = this.props.match.params.name;
		return (
			<div>{name}</div>
		);
	}
}

const KeynoteComposed = compose(
  withRouter,
  withFirebase,
)(Keynote);

export default KeynoteComposed;