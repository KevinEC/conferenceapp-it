import React from 'react';
import "./index.less";

import { withAuthorization } from "../../../Middleware/Session";

import { Segment, Header, Container, Form } from 'semantic-ui-react';

import CreateEventSlider from "./CreateEventSlider.jsx";

const daysData = ['Thursday', 'Friday', 'Saturday'];
const typeData = ['Talk', 'Seminar'];

class CreateEvent extends React.Component {

	constructor(props) {
		super(props);
	}


	render() {
		return (
			<Segment className="createevent-root" vertical>
				<Container className="createevent-container">
					<div className="createevent-header-wrapper">
						<Header size="medium" className="createevent-header-sugar">
							make people inspired
						</Header>
						<Header as="h2" className="createevent-header">
							Create New Event
						</Header>
					</div>
					<div className="createevent-form-wrapper">
						<div className="createevent-form-header">							
							<Form.Input 
								className="createevent-form-field"
								placeholder="name of your event" 
								label="Event name"
								type="text" 
								name="event-title" 
							/>
						</div>
						<Form className="createevent-form">
							<CreateEventSlider label="Day of event" options={daysData} />
							<CreateEventSlider label="Type of event" options={typeData} />
						</Form>
					</div>
				</Container>
			</Segment>
		);
	}
}

export default CreateEvent;


/*
<Form.Group className="createevent-slider-wrapper createevent-form-field">
								<label>Day of event</label>
								<div className="createevent-slider">
									<div className="createevent-slider-option">
										Thursday
									</div>
									<div className="createevent-slider-option">
										Friday
									</div>
									<div className="createevent-slider-option active">
										Saturday
									</div>
									<div className="createevent-slider-highlight"></div>
								</div>
							</Form.Group>

*/