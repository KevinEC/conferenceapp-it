import React from 'react';
import "./index.less";

import { withAuthorization } from "../../../Middleware/Session";

import { Segment, Header, Container, Form } from 'semantic-ui-react';

class CreateEvent extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Segment className="createevent-root" vertical>
				<Container className="createevent-container">
					<Header as="h2" className="createevent-header">
						Create New Event
					</Header>
					<Form className="createevent-form">
						<Header size="large">
							<input
								className="createevent-name"
								placeholder="Event Name"
							/>
						</Header>
					</Form>
				</Container>
			</Segment>
		);
	}
}

export default CreateEvent;