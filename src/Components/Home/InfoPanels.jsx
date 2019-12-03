import React from 'react';

import "./InfoPanels.less"

import { Segment, Header, Container, Image, Button } from 'semantic-ui-react';

import * as ROUTES from "../../Constants/routes";

class InfoPanels extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Segment vertical className="infopanels-root">
				<div className="infopanels-border">
					<Container className="infopanels-container">
						<div id="infopanels-who" className="infopanels-panel">
							<h1 className="ui header infopanels-header">
								Who Are 
								<span>We?</span>
							</h1>
							<span className="infopanels-line"></span>
							<div className="infopanels-about">
								<p>we are the number one conference for everything web. From the creativity of frontend mockups, the efficiency of database communication and to the importance of perfomatice animations. We like all aspects of web development</p>
							</div>
						</div>
						<div id="infopanels-location" className="infopanels-panel">
							<h1 className="ui header infopanels-header">
								Location
							</h1>
							<span className="infopanels-line"></span>
							<div className="infopanels-map">
								<Image src="/map.png" />
							</div>
						</div>
						<div id="infopanels-tickets" className="infopanels-panel">
							<h1 className="ui header infopanels-header">
								Catch
								<span>The Talks</span>
							</h1>
							<span className="infopanels-line"></span>
							<div className="infopanels-map">
								<Button as="a" href={ROUTES.TICKETS} primary circular size="huge" content="Tickets" />
							</div>
						</div>
					</Container>
				</div>
			</Segment>
		);
	}
}

export default InfoPanels;