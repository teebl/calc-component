import React from "react";
import "./Calculator.css";
import logic from "./logic/logic.js";
import Display from "./Display";
import CalcButton from "./CalcButton";

class Calculator extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			display: "",
			ans: ""
		};
	}

	handleDisplayChange = event => {
		// if (this.state.display !== "0") {
		const newDisplay = event.target.value.replace(/^0+/, "");
		this.setState({ display: newDisplay });
		// }
	};

	onButtonPress = symbol => {
		var newSubString;
		if (/\+|\-|\/|\*/.test(symbol)) {
			newSubString = ` ${symbol} `;
		} else {
			newSubString = symbol;
		}

		const newDisplay = this.state.display
			.concat(newSubString)
			.replace(/^0+/, "");

		this.setState({ display: newDisplay });
	};

	onSubmit = event => {
		if (this.state.display !== "0") {
			this.setState({ display: "0", ans: logic(this.state.display) });
		}
	};

	onClear = () => {
		this.setState({ display: "0" });
	};

	render() {
		const simpleKeys = [
			"^",
			"/",
			"1",
			"2",
			"3",
			"*",
			"4",
			"5",
			"6",
			"-",
			"7",
			"8",
			"9",
			"+",
			"0",
			"."
		];
		const simpleButtons = simpleKeys.map(k => (
			<CalcButton symbol={k} key={k} handleClick={this.onButtonPress} />
		));
		return (
			<div className="calculator">
				<Display
					display={this.state.display}
					ans={this.state.ans}
					handleChange={this.handleDisplayChange}
					handleSubmit={this.onSubmit}
				/>
				<CalcButton
					customClass="clearButton"
					symbol="AC"
					handleClick={this.onClear}
				/>
				{simpleButtons}
				<CalcButton
					customClass="equalsButton"
					symbol={"="}
					handleClick={this.onSubmit}
				/>
			</div>
		);
	}
}

export default Calculator;
