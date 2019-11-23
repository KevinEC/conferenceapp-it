import React from 'react';
import "./KeynoteQuestions.less";

import { withFirebase } from "../../../Middleware/Firebase";

import { Header, Input, Icon } from 'semantic-ui-react';


class KeynoteQuestions extends React.Component {

	constructor(props) {
		super(props);

	}

	currentQuestions = () => {
		let result = [];
		console.log("heading: ", this.props.heading, " data: ", this.props.data);
		if(this.props.data && this.props.heading) {
			console.log(`${this.props.heading} == Why it's Wrong`, this.props.heading == "Why it's Wrong");
		}
		if(this.props.data && this.props.heading && this.props.data[this.props.heading]) {
			let questions = this.props.data[this.props.heading];
			console.log("current questions: ", questions);

			for(const question of questions) {
				result.push(
					<li 
						className="keynotequestions-question" 
						title={`asked by ${question.name}`}
					>
						{question.question}
					</li>
				);
			}
		}
		return result;
	};

	render() {
		let questions = this.currentQuestions();

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
						className="keynotequestions-input"
						icon={<Icon inverted size="large" name="plus circle" />}
						placeholder="Ask a Question" 
					/>
					<ul className="keynotequestions-questions">
						{ questions }
					</ul>
				</div>
			</div>
		);
	}
}

export default withFirebase(KeynoteQuestions);