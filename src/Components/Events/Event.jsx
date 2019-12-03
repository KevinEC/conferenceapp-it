import React from 'react';
import "./Event.less";

import { Header } from 'semantic-ui-react';

import EventBadge from "./EventBadge.jsx";

import { colorCode } from "../../Helpers/colorCoding.js";

class Event extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			eventId: this.props.eventId,
			active: null
		}
	}

	passSelectedEvent = () => {
		this.props.passSelectedEvent(this.state.eventId);
	};

	setActive = () => {
		let className;
		if(this.props.active) className = "active-event";
		return className;
	}

	render() {
		let active = this.setActive();

		return (
			<div className={"event-root " + active} onClick={this.passSelectedEvent}>
				<div className="event-info">
					<Header as="h2" className="event-name">{this.props.name}</Header>
					<p className="event-author">{this.props.author}</p>
				</div>
				<div className="event-badges">
					<EventBadge color={colorCode(this.props.room)} content={this.props.room} type="room" />
					<EventBadge color={colorCode(this.props.type)} content={this.props.type} type="category" />
				</div>
				
			</div>
		);
	}
}

export default Event;