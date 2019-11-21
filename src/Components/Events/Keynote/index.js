import React from 'react';
import "./index.less";

import { compose } from 'recompose';
import { withRouter } from "react-router-dom";
import { withFirebase } from "../../../Middleware/Firebase";

import KeynoteHeader from "./KeynoteHeader.jsx";

import { Header, Button, Icon, Segment, Container } from 'semantic-ui-react';

class Keynote extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			id: this.props.match.params.name,
			keynote: null,
		};
	}

	componentDidMount() {
		this.getKeynote();
	}

	getKeynote = async () => {
		let data = await this.props.firebase.db.getDocument('keynotes', this.state.id);
		console.log(data);
		this.setState({keynote: data.keynote});
	};

	createKeynoteHeaders = () => {
		let headers = [];
		if(this.state.keynote) {
			let header; let i = 0;
			for(let header of this.state.keynote) {
				if(header.subheaders) {
					header = <KeynoteHeader headlevel="h2" title={header.title} subheaders={header.subheaders} key={i} />;
				} else {
					header = <KeynoteHeader headlevel="h2" title={header} key={i} />;
				}

				headers.push(header); i++;
			}
		}
		return headers;
	};

	render() {
		let name = this.props.match.params.name;
		let headers = this.createKeynoteHeaders();

		return (
			<Segment vertical inverted className="keynote-root">
				<Container>
					<div className="keynote-content-wrapper">
						<Header inverted as="h2" className="keynote-title">Keynote</Header>
						<Header as="h1" inverted className="keynote-name">
							Modern Animations
						</Header>
						<p className="keynote-author">by Klara West</p>
						<div className="keynote-content">
							{ headers }
						</div>
					</div>
					<div className="keynote-question-wrapper">

					</div>
				</Container>
			</Segment>
		);
	}
}

const KeynoteComposed = compose(
  withRouter,
  withFirebase,
)(Keynote);

export default KeynoteComposed;