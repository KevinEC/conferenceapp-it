import React from 'react';
import "./KeynoteQuestions.less";

import { compose } from 'recompose';
import { withFirebase } from "../../../Middleware/Firebase";
import { withAuthentication } from "../../../Middleware/Session";

import { Header, Input, Icon } from 'semantic-ui-react';


class KeynoteQuestions extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			questions: null,
			newQuestion: "",
			unsub: null
		}
	}

	componentDidUpdate(prevProps) {
		if(this.props.questions != prevProps.questions) {
			this.getQuestions();

			// remove previous listener before init the new one
			if(this.state.unsub != null) {
				console.log("unsubscribed");
				this.state.unsub();
			}

			this.initQuestionsListener();
		}
	};

	initQuestionsListener = async () => {
		console.log("INIT QUESTIONS LISTENER");
		
		let newQuestions;
		if(this.props.questions)
			newQuestions = await this.questionsListener(this.props.questions);

		if(newQuestions) {
			this.setState((prevState) => {
				console.log("original newQuestions: ", newQuestions);
				newQuestions.filter(questionData => !prevState.includes(questionData));
				console.log("difference of newQuestions: ", newQuestions);
				return {
					newQuestions: newQuestions
				}
			});
		}
	};

	getQuestions = async () => {
		let data;
		if(this.props.questions) {
			data = await this.props.firebase.db.fetchQuestions(this.props.questions);
		}
		this.setState({questions: data});
	};

	questionsListener = async (questionsRef) => {
    let newQuestions = [];

		let observer = await questionsRef.onSnapshot((querySnapshot) => {
      querySnapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          console.log('New document: ', change.doc.data());
          newQuestions.push(change.doc.data());
        }
      })
    });

    this.setState({unsub: observer});
    return newQuestions;
	};

	onSubmit = (e) => {
		if(this.state.newQuestion != "") {
			let newQuestionData = {
				question: this.state.newQuestion,
				author: "placeholder"
			};
			//this.props.firebase.db.addQuestion(this.props.questions, newQuestionData);
			this.appendNewQuestion(newQuestionData);
		}
		this.setState({newQuestion: ""});
		e.preventDefault();
	};

	setNewQuestion = (e) => {
		this.setState({newQuestion: e.target.value});
	};

	appendNewQuestion = (questionData) => {
		questionData.animate = 'keynotequestions-animate';
		this.setState((prevState) => {
			prevState.questions.push(questionData);
			return {
				questions: prevState.questions
			};
		});
	};

	currentQuestions = () => {
		let result = [];
		if(this.state.questions) {
			console.log("iterating over: ", this.state.questions);
			let i = 0;
			for(let questionData of this.state.questions) {
				result.push(
					<li 
						className={`keynotequestions-question ${questionData.animate}`}
						title={questionData.author}
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
							
					<form onSubmit={this.onSubmit}>
						<Input 
							inverted
							disabled={!!!this.props.authUser}
							className="keynotequestions-input"
							name="newQuestion"
							value={this.state.newQuestion}
							onChange={this.setNewQuestion}
							placeholder={authMessage} 
							icon={<Icon inverted size="large" name="plus circle" />}
						/>
					</form>
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