import React from 'react';
import "./CreateEventSlider.less";

import { Form } from 'semantic-ui-react';

import CreateEventSliderOption from "./CreateEventSliderOption";

class CreateEventSlider extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			numOptions: this.props.options.length,
			selectOption: null,
			selectOptionNum: 0
		}
	}

	createOptions = () => {
		let options = [];
		//console.log("Creating options ", "selected: ", this.state.selectOption);
		if(this.props.options) {
			let i = 0;
			for(let option of this.props.options) {
				options.push(
					<CreateEventSliderOption 
						className="createevent-slider-option"
						num={i}
						key={i}
						option={option}
						selected={this.state.selectOption}
						passSelectedOption={this.selectOption}
					/>
				);
				i++;
			}
		}
		return options;
	};

	selectOption = (option, num) => {
		//console.log("selectedOption: ", option);
		this.setState({
			selectOption: option,
			selectOptionNum: num
		});
	};

	highlightWidthComputed = () => {
		return (100.0 / this.state.numOptions) + "%";
	};

	highlightPosComputed = () => {
		let ratio = (100.0 / this.state.numOptions);
		let numFactor = this.state.selectOptionNum;

		let margin;
		if(numFactor === 0) margin = `calc(${ratio} * ${numFactor}%)`;
		else margin = `calc((${ratio} * ${numFactor}%) - 8px)`;

		return margin;
	};

	highlightStylesComputed = () => {
		let width = this.highlightWidthComputed();
		let margin = this.highlightPosComputed();

		return {
			width: width,
			marginLeft: margin
		};
	}

	render() {
		let options = this.createOptions();
		let highlightStyles = this.highlightStylesComputed();

		return (
			<Form.Group className="createevent-slider-root createevent-form-field">
				<label>{this.props.label}</label>
				<div className="createevent-slider">
					{ options }
					<div className="createevent-slider-highlight" style={highlightStyles}></div>
				</div>
			</Form.Group>
		);
	}
}

export default CreateEventSlider;