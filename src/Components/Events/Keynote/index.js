import React from 'react';
import "./index.less";

import { compose } from 'recompose';
import { withRouter } from "react-router-dom";
import { withFirebase } from "../../../Middleware/Firebase";

import KeynoteHeader from "./KeynoteHeader.jsx";
import KeynoteQuestions from "./KeynoteQuestions.jsx";

import { Header, Button, Icon, Segment, Container } from 'semantic-ui-react';

class Keynote extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			id: this.props.match.params.name,
			keynote: null,
			selectedQuestions: null,
			selectedHeader: null
		};
		this.questionsNode = null;
	}

	componentDidMount() {
		this.getKeynote();

		this.questionsNode = document.querySelector(".keynote-questions-wrapper");

		document.documentElement.style.setProperty('--scroll', 'overflow-y');
		document.documentElement.style.setProperty('--body-bg-color', '#3d3d3d');
	};

	componentWillUnmount() {
		document.documentElement.style.setProperty('--scroll', 'initial');
		document.documentElement.style.setProperty('--body-bg-color', 'transparent');
	}

	getKeynote = async () => {
		let data = await this.props.firebase.db.getDocument('keynotes', this.state.id);
		this.setState({keynote: data.keynote});
	};

	setSelectedHead = (head, index = null) => {
		let newState = { selectedHeader: head };
		if(index != null) newState.selectedQuestions = this.state.keynote[index].questions;
		this.setState(newState);
	};

	selectedHeaderComputed = () => {
		if(this.state.selectedHeader) return this.state.selectedHeader;
		return null;
	};

	layoutComputed = () => {
		if(this.state.selectedHeader) return 'split-view';
		else return '';
	};

	createKeynoteHeaders = () => {
		let headers = [];
		if(this.state.keynote) {
			let header; let i = 0;
			for(let header of this.state.keynote) {
				if(header.subheaders) {
					header = 
						<KeynoteHeader 
							title={header.title} 
							subheaders={header.subheaders} 
							setSelectedHead={this.setSelectedHead}
							questionsNode={this.questionsNode}
							index={i}
							key={i} 
						/>;
				} else {
					header = 
						<KeynoteHeader 
							title={header.title} 
							setSelectedHead={this.setSelectedHead} 
							questionsNode={this.questionsNode}
							index={i}
							key={i} 
						/>;
				}

				headers.push(header); i++;
			}
		}
		return headers;
	};

	render() {
		let name = this.props.match.params.name;
		let headers = this.createKeynoteHeaders();
		let layout = this.layoutComputed();
		let selectedHeader = this.selectedHeaderComputed();

		return (
			<Segment vertical inverted className={"keynote-root " + layout}>
				<Container className="keynote-container">
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
					<div className="keynote-questions-wrapper">
						<KeynoteQuestions heading={selectedHeader} questions={this.state.selectedQuestions} />
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