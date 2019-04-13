import React from "react";

const CalcButton = props => {
	const componentClasses = "button ".concat(props.customClass);

	return (
		<button
			className={componentClasses}
			onClick={() => {
				props.handleClick(props.symbol);
			}}
		>
			{props.symbol}
		</button>
	);
};

export default CalcButton;
