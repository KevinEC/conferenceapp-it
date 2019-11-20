import React from 'react';
import "./EventBadge.less";

import { Button } from 'semantic-ui-react';


class EventBadge extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Button 
				className={"eventbadge-root " + this.props.type} 
				circular 
				size="mini" 
				color={this.props.color} 
				content={this.props.content} 
			/>
		);
	}
}

export default EventBadge;