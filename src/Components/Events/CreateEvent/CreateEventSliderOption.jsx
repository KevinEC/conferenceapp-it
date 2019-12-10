import React from 'react';
import "./CreateEventSliderOption.less";

class CreateEventSliderOption extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			selected: null
		}
	}

	componenDidMount() {
		console.log("new mount");
		if(this.props.num === 0) this.setState({selected: true});
	};

	componentDidUpdate(prevProps, newProps) {
		console.log("updated");
		if(newProps.selected !== prevProps.selected) {
			console.log("new selected");
			this.setState((state, props) => {
				if(props.option === props.selected) {
					console.log(	"selected: ", this.state.selected);
					return {
						selected: true
					}
				}
			})
		}
	};

	selectOption = () => {
		this.props.passSelectedOption(this.props.option, this.props.num);

		/*this.setState((prevState) => {
			return {
				selected: !prevState.selected
			};
		});*/
	};

	selectedComputed = () => {
		if(this.state.selected) return "selected";
		else return "";
	};	

	render() {
		let selected = this.selectedComputed();
		return (
			<div class={`createeventslideroption-root ${selected}`} onClick={this.selectOption}>
				{this.props.option}
			</div>
		);
	}
}

export default CreateEventSliderOption;