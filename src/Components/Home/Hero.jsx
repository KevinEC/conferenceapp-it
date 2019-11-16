import React from 'react';

import "./Header.less";
//import header1 from "../../../public/header-1.jpg";

import { Segment, Header, Container } from 'semantic-ui-react'


class Hero extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Segment vertical className="header-root">
        <div className="header-bg"></div>
        <Container className="header-content">
        	<Header inverted as="h1" className="header-logo">The Web Conference</Header>
        </Container>

      </Segment>
		);
	}
}

export default Hero;