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
			keynoteTitle: null,
			keynoteAuthor: null,
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
		let data = await this.props.firebase.db.getKeynote(this.state.id);

		console.log("new data structure: ", data);
		this.setState({
			keynote: data.headings, 
			keynoteTitle: data.keynoteData.title,
			keynoteAuthor: data.keynoteData.author
		});
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

	keynoteMetaDataComputed = () => {
		let title = ""; 
		let author = "";

		if(this.state.keynoteTitle) title = this.state.keynoteTitle;
		if(this.state.keynoteAuthor) author = this.state.keynoteAuthor;

		return [title, author];
	};

	createKeynoteHeaders = () => {
		let headers = [];
		if(this.state.keynote) {
			let header; let i = 0;
			for(let headerData of this.state.keynote) {
				if(headerData.heading.subheadings) {
					header = 
						<KeynoteHeader 
							title={headerData.heading.title} 
							subheaders={headerData.heading.subheadings} 
							setSelectedHead={this.setSelectedHead}
							questionsNode={this.questionsNode}
							index={i}
							key={i} 
						/>;
				} else {
					header = 
						<KeynoteHeader 
							title={headerData.heading.title} 
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
		let [title, author] = this.keynoteMetaDataComputed();
		let headers = this.createKeynoteHeaders();
		let layout = this.layoutComputed();
		let selectedHeader = this.selectedHeaderComputed();

		return (
			<Segment vertical inverted className={"keynote-root " + layout}>
				<Container className="keynote-container">
					<div className="keynote-content-wrapper">
						<Header inverted as="h2" className="keynote-title">Keynote</Header>
						<Header as="h1" inverted className="keynote-name">
							{title}
						</Header>
						<p className="keynote-author">{`by ${author}`}</p>
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