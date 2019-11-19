import React from 'react';

import "./Hero.less";

import { Segment, Header, Container, Button, Icon } from 'semantic-ui-react';
import EventPreview from './EventPreview.jsx';

import * as ROUTES from "../../Constants/routes";

const EVENTSDATA = [
	{
		name: "Modern Animations and Performance",
		author: "Kelly Kagan"
	},
	{
		name: "Javascript Frameworks",
		author: "Dave Davidsson"
	},
	{
		name: "Dynamic Frontend Coding",
		author: "Steve Klein"
	},
	{
		name: "Why UX is Overlooked",
		author: "Amanda Fantano"
	},
	{
		name: "Detached Frontend Solutions",
		author: "Dave Smith"
	},
	
];

class Hero extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			current: 0,
			minOffset: 0,
			maxOffset: 0,
			transition: '',
			offset: 0,
			offsetStyle: {},
			ticking: false,
			nEvents: EVENTSDATA.length
		}
		this.eventsData = EVENTSDATA;
		this.ticking = false;
		this.eventsContainer = ".events-preview-container";
	}

	componentDidMount() {
		let minOffset = (this.state.nEvents - 1)*-450; let maxOffset = 0;
		this.setState({minOffset: minOffset, maxOffset: maxOffset});

		this.initScrollListener();
  }
  componentWillUnmount() {
    document.querySelector(this.eventsContainer).removeEventListener('wheel', this.handleScroll);
  }

	setSelectedEvent = (num) => {
		let offset = num*-450;
		let offSetStyle = {left: `${offset}px`};
		this.setState({
			offsetStyle: offSetStyle, 
			offset: offset, 
			current: num, 
			transition: 'slow-transition'
		});
	};

	handleScroll = (deltaX) => {
		let transition = 'quick-transition';
		// determine newOffset from current scroll state
		let currentOffset = this.state.offset;
		let newOffset = currentOffset + deltaX;

		// limit scrolling based on number of events
		if(newOffset < this.state.minOffset) { newOffset = this.state.minOffset; }
		else if(newOffset > this.state.maxOffset) { newOffset = this.state.maxOffset; }

		console.log("deltaX:", deltaX);
		// just look at the direction for the scrolling for snapping
		/*if(Math.abs(deltaX) > 10) {
			let relative = newOffset / 450;
			let relativeDecimal = relative % 1; let posIndex = Math.round(relative);
			let relativePos = Math.abs(relativeDecimal - 0.5);

			newOffset = posIndex*450;
			transition = 'slow-transition';
		}*/

		let offsetStyle = {left: `${newOffset}px`};

		this.setState({
			offsetStyle: offsetStyle, 
			offset: newOffset, 
			transition: transition
		});
	};

	initScrollListener = () => {
		let sliderWrapper = document.querySelector(this.eventsContainer);
    sliderWrapper.addEventListener('wheel', (e) => {
    	if(!this.ticking) {
    		window.requestAnimationFrame(() => {
    			//console.log("event: ", e);

	    		//this.setState({ticking: false});
	    		this.ticking = false;
	    		this.handleScroll(-e.deltaX);
	    	});
	    	//this.setState({ticking: true});
	    	this.ticking = true;
    	}
    });
	}


	render() {
		let events = []; let i = 0;

		for(let event of this.eventsData) {
			events.push(
				<EventPreview 
					name={event.name} 
					author={event.author}
					key={i} 
					num={i} 
					passSelectedEvent={this.setSelectedEvent}
				/>
			);
			i++;
		}

		return (
			<Segment vertical className="header-root">
        <div className="header-bg"></div>
        <Container className="header-content">
        	<Header inverted as="h1" className="header-logo">The Web Conference</Header>
        	<p className="header-logo-description">The latest from tech, all things web and the brightest minds in the field. Join the experience.</p>
        	<Header inverted as="h4" className="events-preview-title">Talks Happening</Header>
        	<div className="events-preview-container">
	        	<div className={"events-preview-wrapper " + this.state.transition } style={this.state.offsetStyle}>
	        		{ events }
	        	</div>
        	</div>
        	<Button as="a" href={ROUTES.EVENTS} className="header-all-event-btn" icon labelPosition="left" inverted>
        		<Icon name="arrow right"/>
        		events
        	</Button>
        </Container>
      </Segment>
		);
	}
}

export default Hero;