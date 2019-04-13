import React from "react";

const Display = props => {
	const submitHandler = event => {
		if (event.key === "Enter") {
			event.preventDefault();
			event.stopPropagation();
			props.handleSubmit();
		}
	};
	return (
		<form className="display" onKeyDown={submitHandler}>
			<input type="text" value={props.display} onChange={props.handleChange} />
			<input type="text" value={props.ans} />
		</form>
	);
};

export default Display;
