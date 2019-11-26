import React from 'react';
import "./KeynoteHeader.less";

import { Header } from 'semantic-ui-react';

import KeynoteHeaderChild from "./KeynoteHeader.jsx";

class KeynoteHeader extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			active: false,
			focus: false,
			title: this.props.title
		}
	}

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

	onBlur = (event) => {
		this.setState({focus: false});
	};

	onFocus = (event) => {
		this.setState({focus: true});
	};

	toggle = () => {
		this.setState((state, props) => {
			this.passSelectedHead(!state.active);
			return { active: !state.active, focus: false };
		});
	};

	setWrapperRef = (node) => {
    this.wrapperRef = node;
  };

	handleClickOutside = (event) => {
    if (this.wrapperRef &&
     		!this.wrapperRef.contains(event.target) &&
     		!this.props.questionsNode.contains(event.target)
    ){
      this.setState({active: false });
    }
  };

	passSelectedHead = (active) => {
		if(active) this.props.setSelectedHead(this.state.title, this.props.index);
		else this.props.setSelectedHead(null);
	};

	createSubheaders = () => {
		let subheaders = []; let i = 0;
		let result;
		if(this.props.subheaders) {
			for(let subhead of this.props.subheaders) {
				subheaders.push(<Header as="h3" content={subhead} className="keynoteheader-subheader" inverted key={i} tabIndex="0" />);
				i++;
			}
			result = 
				<div className="keynoteheader-subheaders-wrapper">
					<div className="keynoteheader-subheaders" onClick={this.passSelectedHead}>
						{subheaders}
					</div>
				</div>;
		}
		else result = '';
		return result;
	};

	activeComputed = () => {
		if(this.state.active) return "active-header";
		return "";
	};

	focusComputed = () => {
		if(this.state.focus) return "focus-header";
		return "";
	};

	render() {
		let subheaders = this.createSubheaders();
		let active = this.activeComputed(); 
		let focus = this.focusComputed(); 

		return (
			<div 
				className={`keynoteheader-root ${active} ${focus}`} 
				onFocus={this.onFocus}
				onBlur={this.onBlur}
				onClick={this.toggle}
				ref={this.setWrapperRef}
				tabIndex="0"
			>
				<Header inverted as="h2" className="keynoteheader-title">
					{ this.state.title }
				</Header>
				{ subheaders }
			</div>
		);
	}
}

export default KeynoteHeader;