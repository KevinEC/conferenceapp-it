import React from 'react';
import "./EventExpand.less";

import { Header, Button, Icon } from 'semantic-ui-react';
class EventExpand extends React.Component {

	constructor(props) {
		super(props);

	}

	setContent = () => {
		let name, author, description, date, time;
		if(this.props.data) {
			name = this.props.data.name;
			author = this.props.data.author;
			description = this.props.data.description;
			date = (new Date(this.props.data.time.seconds * 1000)).toDateString();
			time = (new Date(this.props.data.time.seconds * 1000)).toTimeString().substring(0,5);
		}
		return [name, author, description, date, time];
	};

	render() {
		let [name, author, description, date, time] = this.setContent();

		return (
			<div className="eventexpand-root">
				<div className="eventexpand-head">
					<Header as="h2" content={name} />
					<Icon circular color="red" name="heart outline" />
				</div>
				<p className="eventexpand-author">{author}</p>
				<div>
					<span className="eventexpand-time">{time}</span>
					<span className="eventexpand-date">{date}</span>
				</div>
				<p className="eventexpand-description">{description}</p>
				<div className="eventexpand-buttons">
					<Button primary className="eventexpand-attend">Attend</Button>
					<Button inverted primary className="eventexpand-keynotes">Keynotes</Button>
				</div>
			</div>
		);
	}
}

export default EventExpand;