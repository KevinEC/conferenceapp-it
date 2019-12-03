import React from 'react';
import "./index.less";

import { compose } from 'recompose';
import { withFirebase } from "../../Middleware/Firebase";
import { withRouter } from "react-router-dom";

import { Segment, Header, Container } from 'semantic-ui-react';

import RoomHeader from "./RoomHeader.jsx";
import Event from "./Event.jsx";
import EventExpand from "./EventExpand.jsx";

import camelCase from "lodash/camelCase"; 
import { colorCode } from "../../Helpers/colorCoding.js";
import * as ROUTES from "../../Constants/routes.js"; 

class Events extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			eventsData: null,
			selectedId: null,
			selectedEvent: null,
		}

	}

	componentDidMount() {
		this.getEvents();
	}

	getEvents = async () => {
		let data = await this.props.firebase.db.getAll('events');
		this.setState({eventsData: data});

		// set selected event if route contains event name
		if(this.props.match.params.name)
			this.setSelectedEvent(this.props.match.params.name);
	};

	setSelectedEvent = (id) => {
		id = camelCase(id);
		let selectedEventData = this.state.eventsData.find(event => (camelCase(event.data.name) === id));


		this.props.history.push(`${ROUTES.EVENTS}/${camelCase(selectedEventData.data.name)}`);

		this.setState((state, props) => {
			return {
				selectedId: id,
				selectedEvent: {
					name: selectedEventData.data.name,
					author: selectedEventData.data.author,
					description: selectedEventData.data.description,
					time: selectedEventData.data.time,
				}
			}
		});
	};

	setLayout = (state) => {
		let className;
		if(state.selectedId) { return 'split'; }
		else { return ''; } 
	};

	createEvents = () => {
		let room1 = []; let room2 = []; let room3 = []; 
		if(this.state.eventsData) {
			for(let event of this.state.eventsData) {

				let active = false;
				if(this.state.selectedId === camelCase(event.data.name)) active = true; 

				let eventElement = 	
				<Event 
						name={event.data.name}
						author={event.data.author}
						room={event.data.room}
						type={event.data.type}
						active={active}
						passSelectedEvent={this.setSelectedEvent}
						eventId={camelCase(event.data.name)}
						key={event.id}
					/>
				
				if(event.data.room === "Room 1") { room1.push(eventElement); }
				else if(event.data.room === "Room 2") { room2.push(eventElement); }
				else if(event.data.room === "Room 3") { room3.push(eventElement); }

			}
		}
		return [room1, room2, room3];
	};

	defineHeaders = (room1Length, room2Length, room3Length) => {
		let header1 = ''; let header2 = ''; let header3 = '';
		if(room1Length > 0) {header1 = <RoomHeader roomnumber="1" color={colorCode('room 1')} />;}
		if(room2Length > 0) {header2 = <RoomHeader roomnumber="2" color={colorCode('room 2')} />;}
		if(room3Length > 0) {header3 = <RoomHeader roomnumber="3" color={colorCode('room 3')} />;}

		return [header1, header2, header3];
	}

	render() {
		let [room1, room2, room3] = this.createEvents();
		let [header1, header2, header3] = this.defineHeaders(room1.length, room2.length, room3.length);
		let layout = this.setLayout(this.state);

		return (
			<Segment vertical className={"events-root " + layout}>
				<Container className="events-container">
					<Header as="h1" size="huge" content='Events' className="events-header"/>
					<div className="events-body">
						<div className="events-wrapper">
							{header1}
							{room1}
							{header2}
							{room2}
							{header3}
							{room3}
						</div>
						<div className="events-preview">
							<EventExpand eventId={this.state.selectedId} data={this.state.selectedEvent} />
						</div>
					</div>
				</Container>
			</Segment>
		);
	}
}

const EventsComposed = compose(
	withFirebase,
	withRouter
)(Events);

export default withFirebase(EventsComposed);