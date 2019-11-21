import React from 'react';
import "./RoomHeader.less";

import { Header, Icon } from 'semantic-ui-react';

class RoomHeader extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="roomheader-root">
				<Header as="h3">
					{"Room " + this.props.roomnumber}
				</Header>
				<Icon name="circle" color={this.props.color} size="small" className="roomheader-circle" />
			</div>
		);
	}
}

export default RoomHeader;