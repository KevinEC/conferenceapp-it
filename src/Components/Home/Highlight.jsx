import React from 'react';
import "./Highlight.less";

import { Header, Image } from 'semantic-ui-react';

class Highlight extends React.Component {

	render() {
		return (
			<div className="highlight-root">
				<div className="highlight-img-wrapper">
					<Image src={this.props.img} className="highlight-img"/>
				</div>
				<Header 
					inverted
					as="h3" 
					size="large" 
					textAlign="center" 
					content={this.props.name} 
					className="highlight-title"
				/>
			</div>
		);
	}
}

export default Highlight;