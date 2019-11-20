import React from 'react';

import "./EventPreview.less";

import { Header, Button } from 'semantic-ui-react';

class EventPreview extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			key: this.props.num
		}
	}

	onClick = (event) => {
		this.props.passSelectedEvent(this.state.key);
	}

	render() {
		return (
			<div className="event-preview-root" onClick={this.onClick}>
				<Header as="h3" className="event-preview-header">
					{ this.props.name }
				</Header>
				<span className="event-preview-author">
					{ "by " + this.props.author }
				</span>
				<Button primary size="small" className="event-preview-btn">more</Button>
			</div>
		);
	}
}

export default EventPreview;