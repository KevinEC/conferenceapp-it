import React from 'react';
import "./Highlights.less";

import { Segment, Header, Container} from 'semantic-ui-react';

import Highlight from "./Highlight";

class Highlights extends React.Component {

	render() {
		return (
			<Segment inverted vertical className="highlights-root">
				<Container>
					<Header inverted as="h2" textAlign="center" content="Keynotes" className="highlights-header"/>
					<div className="highlight-container">
						<Highlight img="/profile1.jpg" name="Jordan Rock" />
						<Highlight img="/profile2.jpg" name="Steve Wick" />
						<Highlight img="/profile3.jpg" name="Anna Willson" />
					</div>
				</Container>
			</Segment>
		);
	}
}

export default Highlights;