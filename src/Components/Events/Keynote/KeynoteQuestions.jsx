import React from 'react';
import "./KeynoteQuestions.less";

import { Header, Input, Icon } from 'semantic-ui-react';


class KeynoteQuestions extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			heading:  this.props.heading
		};
	}

	render() {
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
				</div>
			</div>
		);
	}
}

export default KeynoteQuestions;