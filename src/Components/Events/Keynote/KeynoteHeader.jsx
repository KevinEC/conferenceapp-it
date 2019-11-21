import React from 'react';
import "./KeynoteHeader.less";

import { Header } from 'semantic-ui-react';

import KeynoteHeaderChild from "./KeynoteHeader.jsx";

class KeynoteHeader extends React.Component {

	constructor(props) {
		super(props);
	}

	createSubheaders = () => {
		let subheaders = []; let i = 0;
		if(this.props.subheaders) {
			for(let subhead of this.props.subheaders) {
				subheaders.push(<KeynoteHeaderChild title={subhead} headlevel="h3" key={i} />);
				i++;
			}
		}
		return subheaders;
	};

	render() {
		let subheaders = this.createSubheaders();

		return (
			<div className="keynoteheader-root">
				<Header inverted as={this.props.headlevel} className="keynoteheader-title">
					{ this.props.title }
					<div className="keynoteheader-subheaders">
						{ subheaders }
					</div>
				</Header>
			</div>
		);
	}
}

export default KeynoteHeader;