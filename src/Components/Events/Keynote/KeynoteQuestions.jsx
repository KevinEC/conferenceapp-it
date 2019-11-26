import React from 'react';
import "./KeynoteQuestions.less";

import { compose } from 'recompose';
import { withFirebase } from "../../../Middleware/Firebase";
import { withAuthentication } from "../../../Middleware/Session";

import { Header, Input, Icon } from 'semantic-ui-react';


class KeynoteQuestions extends React.Component {

	constructor(props) {
		super(props);
	}

	currentQuestions = () => {
		let result = [];
		if(this.props.questions) {
			let i = 0;
			for(let questionData of this.props.questions) {
				result.push(
					<li 
						className="keynotequestions-question"
						title={questionData.name}
						key={i}
					>
						{questionData.question}
					</li>
				);
				i++;
			}
		}
		return result;
	};

	createAuthMessage = () => {
		let message;
		if(!!!this.props.authUser) message = "you need to be logged in to ask a question";
		else message = "Ask a Question";
		return message;
	};
 
	render() {
		let questions = this.currentQuestions();
		let authMessage = this.createAuthMessage();

		return (
			<div className="keynotequestions-root">
				<div className="keynotequestions-sticky">
					<Header inverted as="h2" className="keynotequestions-title">
						Questions
					</Header>
					<Header inverted as="h2" className="keynotequestions-heading">
						{ this.props.heading }
					</Header>
					<Input 
						inverted
						disabled={!!!this.props.authUser}
						className="keynotequestions-input"
						icon={<Icon inverted size="large" name="plus circle" />}
						placeholder={authMessage} 
					/>
					<ul className="keynotequestions-questions">
						{ questions }
					</ul>
				</div>
			</div>
		);
	}
}
const condition = authUser => !!authUser;

const KeynoteQuestionsComposed = compose(
	withFirebase,
	withAuthentication,
)(KeynoteQuestions);

export default KeynoteQuestionsComposed;